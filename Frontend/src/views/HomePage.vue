<template>
  <div class="main">
    <div class="card">
      <div class="btn1"></div>
      <div class="btn2"></div>
      <div class="btn3"></div>
      <div class="btn4"></div>
      <div class="card-int">
        <div class="hello">
          Hello
          <span class="hidden">uiverse</span>
        </div>
      </div>
      <div class="top">
        <div class="camera">
          <div class="int"></div>
        </div>
        <div class="speaker"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @include w-100-h-100;
  @include display-flex-center-center;
}

.card {
  width: 210px;
  height: 400px;
  background: black;
  border-radius: 35px;
  border: 2px solid rgb(40, 40, 40);
  padding: 7px;
  position: relative;
  box-shadow: 2px 5px 15px rgba(0, 0, 0, 0.486);
}

.card-int {
  background-image: linear-gradient(
    to right bottom,
    #ff0000,
    #ff0045,
    #ff0078,
    #ea00aa,
    #b81cd7,
    #8a3ad6,
    #5746cf,
    #004ac2,
    #003d94,
    #002e66,
    #001d3a,
    #020812
  );
  background-size: 200% 200%;
  background-position: 0% 0%;
  height: 100%;
  border-radius: 25px;
  transition: all 0.6s ease-out;
  overflow: hidden;
}

.card:hover .card-int {
  background-position: 100% 100%;
}

.top {
  position: absolute;
  top: 0px;
  right: 50%;
  transform: translate(50%, 0%);
  width: 35%;
  height: 18px;
  background-color: black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.speaker {
  position: absolute;
  top: 2px;
  right: 50%;
  transform: translate(50%, 0%);
  width: 40%;
  height: 2px;
  border-radius: 2px;
  background-color: rgb(20, 20, 20);
}

.camera {
  position: absolute;
  top: 6px;
  right: 84%;
  transform: translate(50%, 0%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.048);
}

.int {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: rgba(0, 0, 255, 0.212);
}

.btn1,
.btn2,
.btn3,
.btn4 {
  position: absolute;
  width: 2px;
}

.btn1,
.btn2,
.btn3 {
  height: 45px;
  top: 30%;
  right: -4px;
  background-image: linear-gradient(
    to right,
    #111111,
    #222222,
    #333333,
    #464646,
    #595959
  );
}

.btn2,
.btn3 {
  transform: scale(-1);
  left: -4px;
}

.btn2,
.btn3 {
  transform: scale(-1);
  height: 30px;
}

.btn2 {
  top: 26%;
}

.btn3 {
  top: 36%;
}

.hello {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  line-height: 35px;
  height: 100%;
  transition: 0.5s ease-in-out;
}

.hidden {
  display: block;
  opacity: 0;
  transition: all 0.3s ease-in;
}

.card:hover .hidden {
  opacity: 1;
}

.card:hover .hello {
  transform: translateY(-20px);
}
</style>
