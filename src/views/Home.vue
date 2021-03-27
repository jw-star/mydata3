<template>
  <div class="home">
    <div class="loading-wrapper" v-show="showLoading">
      <Loading></Loading>
    </div>
    <el-container>
      <el-header>
                  <el-card shadow="hover">
        <el-row :gutter="10">
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4">
              <el-button type="primary" @click="logout">注 销</el-button>
            </el-col>

        </el-row>
                  </el-card>
      </el-header>
    </el-container>
    <br /><br />
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card shadow="always" style="text-align: center">
            <el-select
              v-model="opValue"
              multiple
              clearable
              placeholder="请选择注册网站"
              ref="selection"
            >
              <el-option
                v-for="item in sites"
                :key="item.id"
                :label="item.siteAddress"
                :value="item.id"
              >
                <span style="float: left">{{ item.siteName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.siteAddress
                }}</span>
              </el-option>
            </el-select>
            <el-tooltip placement="right">
              <template #content
                >查询<br />
                1.多个条件用 'and' 分开<br />
                2.下方为查询的字段<br />
                事例： requested_loan_amount >0 and state_ab in ('CA','AL')
              </template>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 8 }"
                placeholder="请输入查询条件"
                autofocus
                v-model="textarea1"
                :rows="8"
                style="margin-top: 4px"
              ></el-input>
            </el-tooltip>
            <el-button
              type="primary"
              style="margin-top: 4px"
              icon="el-icon-search"
              @click="search"
              >生成数据</el-button
            >
          </el-card>
          <el-card shadow="always" style="margin-top: 4px">
            <el-row :gutter="10">
              <el-col
                :xs="24"
                :sm="12"
                :md="10"
                :lg="9"
                :xl="9"
                v-for="(key, value) in datalist[0]"
                :key="value"
                style="margin-left: 6px"
              >
                <el-tag type="danger">
                  {{ toLine(value) }}
                </el-tag>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-card v-if="flag" shadow="always">
            <el-row :gutter="10">
              <el-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="8"
                :xl="8"
                v-for="(val, name) in datalist[0]"
                :key="name"
              >
                <el-input v-model="datalist[0][name]" style="margin-top: 4px">
                  <template #prepend>{{ name }}</template>
                </el-input>
              </el-col>
            </el-row>
          </el-card>
          <el-card v-if="!flag" shadow="always">无数据</el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import { ref, onMounted } from "vue";
import { getAll, getSite } from "@/api/index.js";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
export default {
  name: "Home",
  components: {
    Loading,
  },
  setup() {
    const opValue = ref([]),
      textarea1 = ref(""),
      flag = ref(false),
      showLoading = ref(true),
      stateList = ref([]),
      datalist = ref([]),
      currtPage = ref(1),
      total = ref(2),
      sites = ref([]),
      a = ref("ddd");
    const router = useRouter();
    onMounted(() => {
      getSite()
        .then((res) => {
          if (res.code == "005") {
            sites.value = res.data;
            showLoading.value = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    const search = (event) => {
      if (opValue.value == "") {
        alert("请选择要注册的网站");
        return;
      }
      send();
    };
    const toLine = (name) => {
      return name
        .toString()
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase();
    };
    const logout =()=>{
        localStorage.removeItem('mydataToken')
        router.push("/login");
    }

    const send = () => {
      if (currtPage.value >= total.value) {
        currtPage.value = 1;
      } else {
        currtPage.value++;
      }
      console.log(opValue.value);
      getAll({
        currtPage: currtPage.value,
        size: 1,
        textarea1: textarea1.value,
        opValue: opValue.value,
      }).then((res) => {
        if (res.code == "005") {
          res = res.data;
          console.log(res);
          if (res.datalist.records.length > 0) {
            total.value = res.datalist.total;
            datalist.value = res.datalist.records;
            currtPage.value = res.datalist.current;
            showLoading.value = false;
            flag.value = true;
            ElNotification({
              showClose: true,
              message: "数据生成成功！",
            });
          } else {
            ElNotification({
              showClose: true,
              message: "没有数据！",
            });
            flag.value = false;
          }
        } else if (res.code == "026") {
          router.push("/login");
        }
      });
    };

    return {
      opValue,
      textarea1,
      flag,
      showLoading,
      stateList,
      datalist,
      currtPage,
      total,
      sites,
      search,
      toLine,
      a,
      logout
    };
  },
};
</script>
