const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");
const { getAvatarUrl } = require("../helpers");

exports.getNewsArticles = async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  let whereClause = {};
  if (search.trim() !== "") {
    whereClause = {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    };
  }

  const [newsArticles, totalNews] = await Promise.all([
    db.News.findAll({
      where: whereClause,
      limit: pageSize,
      offset: offset,
    }),
    db.News.count({
      where: whereClause,
    }),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách tin tức thành công",
    data: newsArticles.map((newsArticle) => ({
      ...newsArticle.get({ plain: true }),

      image: getAvatarUrl(newsArticle.image),
    })),
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalNews / pageSize),
    total: totalNews,
  });
};

exports.getNewsArticleById = async (req, res) => {
  const { id } = req.params;

  const newsArticleById = await db.News.findByPk(id);
  if (!newsArticleById) {
    return res.status(404).json({
      message: "Không tìm thấy tin tức",
    });
  }

  return res.status(200).json({
    message: "Lấy tin tức thành công",
    data: {
      ...newsArticleById.get({ plain: true }),

      image: getAvatarUrl(newsArticleById.image),
    },
  });
};

exports.insertNewsArticle = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const newsArticle = await db.News.create(req.body, { transaction });

    const productIds = req.body.product_ids;
    if (productIds && productIds.length) {
      const validProducts = await db.Product.findAll({
        where: { id: productIds },
        transaction,
      });
      const validProductIds = validProducts.map((product) => product.id);

      const filteredProductIds = productIds.filter((id) =>
        validProductIds.includes(id)
      );
      const newsDetailPromises = filteredProductIds.map((product_id) =>
        db.NewsDetail.create(
          {
            product_id: product_id,
            news_id: newsArticle.id,
          },
          { transaction }
        )
      );
      await Promise.all(newsDetailPromises);
    }
    await transaction.commit();
    return res.status(201).json({
      message: "Thêm tin tức thành công",
      data: {
        ...newsArticle.get({ plain: true }),

        image: getAvatarUrl(newsArticle.image),
      },
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Lỗi khi thêm tin tức",
      error: error.message,
    });
  }
};

exports.deleteNewsArticle = async (req, res) => {
  const { id } = req.params;
  const transaction = await db.sequelize.transaction();
  try {
    await db.NewsDetail.destroy({
      where: { news_id: id },
      transaction,
    });
    const deletedNewsArticle = await db.News.destroy({
      where: { id },
      transaction,
    });

    if (deletedNewsArticle) {
      await transaction.commit();
      return res.status(200).json({
        message: "Xóa tin tức thành công",
      });
    } else {
      await transaction.rollback();
      return res.status(404).json({
        message: "Không tìm thấy tin tức",
      });
    }
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: "Lỗi khi xóa tin tức",
      error: error.message,
    });
  }
};

exports.updateNewsArticle = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;
  const existingNewsArticle = await db.News.findOne({
    where: {
      name: name,
      id: { [Sequelize.Op.ne]: id },
    },
  });
  if (existingNewsArticle) {
    return res.status(409).json({
      message: "Tên tin tức tồn tại",
    });
  }

  const updateNewsArticle = await db.News.update(req.body, {
    where: { id },
  });
  return res.status(200).json({
    message: "Cập nhật tin tức thành công",
  });
};
