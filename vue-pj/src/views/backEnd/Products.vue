<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button type="button" class="btn btn-primary" @click="openModal(true)">
        建立新產品
      </button>
    </div>
    <div class="table-responsive-lg">
      <table class="table table-sm mt-5">
        <thead>
          <th width="15%">分類</th>
          <th width="20%">名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="15%">啟用</th>
          <th width="80">編輯</th>
          <th width="120">刪除</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">
              {{ item.origin_price | currency }}
            </td>
            <td class="text-right">
              {{ item.price | currency }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-outline-primary"
                @click="openModal(false, item)"
              >
                編輯
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click="openDelModal(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <Pagination @postPage="getProducts" :page-data="pagination"></Pagination> -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="Please Enter Image Url"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUpLoading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    @change="uploadFile"
                    ref="files"
                  />
                </div>
                <img
                  class="img-fluid"
                  alt="商品圖片"
                  :src="tempProduct.imageUrl"
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">產品名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="Please Enter Title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.category"
                      placeholder="Please Enter Category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempProduct.unit"
                      placeholder="Please Enter Unit"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      placeholder="Please Enter Price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempProduct.price"
                      placeholder="Please Enter Sale"
                    />
                  </div>
                </div>
                <hr />
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="Please Enter Product Description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempProduct.content"
                    placeholder="Please Enter Content"
                  >
                  </textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- DelModal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>Delete Product</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger"></strong>商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      products: [],
      pagenation: {},
      tempProduct: {},
      isLoading: false,
      isNew: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products`
      const vm = this
      vm.isLoading = true
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH)
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    openDeleteModal (item) {
      const vm = this
      $('#delProductModal').modal('show')
      vm.tempProduct = Object.assign({}, item)
    },
    deleteProduct () {
      const vm = this
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      this.$http.delete(api).then((response) => {
        console.log(response, vm.tempProduct)
        $('#delProductModal').modal('hide')
        this.getProducts()
      })
    },
    uploadFile () {
      console.log(this)
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData() // FormData 模擬以往欄位的形式
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response.data)
          vm.status.fileUploading = false
          if (response.data.success) {
            vm.tempProduct.imageUrl = response.data
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          } else {
            this.$bus.$emit('message:push', response.data.message, 'danger')
          }
        })
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH)
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('新增失敗')
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
