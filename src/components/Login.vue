<template>
  <div class="loading-wrapper" v-show="showLoading">
    <Loading></Loading>
  </div>

  <div class="login-wrapper" v-show="!showLoading">
    <el-image :src="imgUrl" alt="" width="100%" height="100%" />

    <div class="login">
      <p class="title">登录</p>
      <el-form status-icon ref="ruleForm" label-width="0" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input
            v-model="loginForm.username"
            auto-complete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="loginForm.password"
            @keydown.enter="login"
            auto-complete="off"
            placeholder="输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
          <!-- <p class="register" @click="login">没有账户？立即注册</p> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import Loading from "@/components/Loading.vue";
import { ElNotification } from 'element-plus'
import { Login, getData } from "@/api/index.js";
import { useRouter} from 'vue-router' 
export default {
  name: "Login",
  props: {},
  components: {
    Loading,
  },
  setup() {
    const showLoading = ref(true);
    const imgUrl = ref(require("@/assets/bg.jpg"));
    const loginForm = reactive({
      username: "",
      password: "",
    });
    const router = useRouter()  

    onMounted(() => {
      let bgImg = new Image();
      bgImg.src = imgUrl.value;

      bgImg.onerror = (e) => {
        console.log(e);
      };
      bgImg.onload = () => {
        // 图片加载成功后 去除loading
        showLoading.value = false;
      };
    });

    const getCompany = () => {
      getData()
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    };
    const login = () => {
      if (loginForm.username === "" || loginForm.password === "") {
        alert("账号或密码不能为空");
      } else {
        Login(loginForm)
          .then((res) => {
              console.log(res) 
                console.log(res);
                if(res.code !='017'){
                    alert(res.message)
                }else if (res.code =='017'){
                    localStorage.setItem('mydataToken','Bearer '+res.data)
                    ElNotification({
                         message: res.message
                    })
                    router.push('/')
                }

          })
          .catch((error) => {
             ElNotification({
            showClose: true,
            message: '网络异常',
            type: 'error'
          });
            console.log(error);
          });
      }
    };

    return {
      getCompany,
      showLoading,
      imgUrl,
      loginForm,
      login,
    };
  },
};
</script>

<style scoped>
.login-wrapper .el-image {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.login-wrapper img {
  position: absolute;
  z-index: 1;
  max-width: 100%;
  max-height: 100%;
}
.login {
  max-width: 340px;
  margin: 150px auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 10px;
  position: relative;
  z-index: 9;
}
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
#login-form > input {
  width: 100%;
  height: 34px;
  display: block;
  margin-top: 26px;
  background: #fff;
  color: #333;
  border: 1px solid #7da9c7;
  outline: none;
  text-indent: 20px;
  font-size: 14px;
}
#login-form > button {
  width: 100%;
  height: 34px;
  display: block;
  margin-top: 26px;
  background: #1ab2ff;
  color: #fff;
  border: 1px solid #1ab2ff;
  outline: none;
  border-radius: 100px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.register {
  margin-top: 10px;
  font-size: 14px;
  line-height: 22px;
  text-indent: 8px;
  color: #1ab2ff;
  cursor: pointer;
  display: inline-block;
}
.register:hover {
  color: #2c2fd6;
}
@media (max-width: 768px) {
  .login {
    max-width: 260px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 20px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
  }
}
</style>
