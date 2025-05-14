const Sequelize = require("sequelize");
const { Op } = Sequelize;
const db = require("../models");

exports.getNewsDetails = async (req, res) => {
  const { page = 1 } = req.query;
  const pageSize = 5;
  const offset = (page - 1) * pageSize;

  const [newsDetails, totalNewsDetails] = await Promise.all([
    db.NewsDetail.findAll({
      limit: pageSize,
      offset: offset,
      include: [
        {
          model: db.News,
        },
        {
          model: db.Product,
        },
      ],
    }),
    db.NewsDetail.count(),
  ]);

  return res.status(200).json({
    message: "Lấy danh sách chi tiết tin tức thành công",
    newsDetails: newsDetails,
    current_page: parseInt(page, 10),
    total_page: Math.ceil(totalNewsDetails / pageSize),
    total: totalNewsDetails,
  });
};

exports.getNewsDetailById = async (req, res) => {
  const { id } = req.params;

  const newsDetail = await db.NewsDetail.findByPk(id, {
    include: [{ model: db.News }, { model: db.Product }],
  });
  if (!newsDetail) {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết tin tức",
    });
  }
  return res.status(200).json({
    message: "Lấy chi tiết tin tức thành công",
    newsDetail: newsDetail,
  });
};

exports.insertNewsDetail = async (req, res) => {
  const { product_id, news_id } = req.body;

  const productExists = await db.Product.findByPk(product_id);
  if (!productExists) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  const newsExists = await db.News.findByPk(news_id);
  if (!newsExists) {
    return res.status(404).json({
      message: "Không tìm thấy tin tức",
    });
  }

  const duplicateExists = await db.NewsDetail.findOne({
    where: { product_id, news_id },
  });
  if (duplicateExists) {
    return res.status(409).json({
      message: "Chi tiết tin tức đã tồn tại",
    });
  }

  const newNewsDetail = await db.NewsDetail.create({ product_id, news_id });

  return res.status(201).json({
    message: "Thêm chi tiết tin tức thành công",
    newsDetail: newNewsDetail,
  });
};

exports.deleteNewsDetail = async (req, res) => {
  const { id } = req.params;

  const deleteNewsDetail = await db.NewsDetail.destroy({
    where: { id },
  });
  if (deleteNewsDetail) {
    return res.status(200).json({
      message: "Xóa chi tiết tin tức thành công",
    });
  } else {
    return res.status(404).json({
      message: "Không tìm thấy chi tiết tin tức",
    });
  }
};

exports.updateNewsDetail = async (req, res) => {
  const { id } = req.params;

  const { product_id, news_id } = req.body;
  const existingDuplicate = await db.NewsDetail.findOne({
    where: {
      product_id,
      news_id,
      id: { [Sequelize.Op.ne]: id },
    },
  });

  if (existingDuplicate) {
    return res.status(409).json({
      message: "Chi tiết tin tức đã tồn tại",
    });
  }

  const updateNewsDetail = await db.NewsDetail.update(
    { product_id, news_id },
    { where: { id: id } }
  );
  return res.status(200).json({
    message: "Cập nhật chi tiết tin tức thành công",
  });
};
