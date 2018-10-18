<template>
  <div class="detail-container">
    <div class="search">
      <div class="concatField">
        <el-input
          @keyup.enter.native="searchFirst()"
          placeholder="请输入关键字"
          v-model="concatField"
          clearable>
        </el-input>
        <el-button type="primary" @click="searchFirst()">搜索</el-button>
        <el-button type="warning" @click="isShow = !isShow"> 精确搜索</el-button>
        <ul class="list_menu">
          <li v-show="superShow == 'true'" @click="insertShow = true">新增</li>
          <li @click="_softDelete()">删除</li>
          <li v-show="fileTypeFlag !=='0'"><a @click="exportIP($event)" href="javascript:void(0)">导出</a></li>
          <li v-show="fileTypeFlag !=='0'">
            <span class="inputParent">
               导入
              <input type="file" id="file"  @change="importFile($event)"  class="inputstyle"  title="请选择.excel">
            </span>
          </li>
        </ul>
      </div>
      <transition name="slide">
        <div v-if="isShow" class="detail_father">
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">序号：</span>
              <el-input class="detail-input" @keyup.native="searchFirst()"  v-model="virtualId"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">档号：</span>
              <el-input class="detail-input" @keyup.native="searchFirst()"  v-model="id"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">文号：</span>
              <el-input class="detail-input" @keyup.native="searchFirst()"  v-model="fileId"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">题名：</span>
              <el-input class="detail-input" @keyup.native="searchFirst()"  v-model="title"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">责任人：</span>
              <el-input class="detail-input" @keyup.native="searchFirst()"  v-model="responsePerson"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">备注：</span>
              <el-select v-if="note === '借阅' || note === '销毁' || note === '其他'" v-model="note" placeholder="请选择" @change="searchFirst()" class="detail-input">
                <el-option v-for="item in noteOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
              <el-input v-else class="detail-input"  @keyup.native="searchFirst()" v-model="note"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">密级：</span>
              <el-select v-model="level" placeholder="请选择" @change="searchFirst()" class="detail-input">
                <el-option v-for="item in levelOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="detail-item">
              <!--<span class="input-label">文件类型：</span>-->
              <!--<el-select v-model="fileType" @change="searchFirst()" placeholder="请选择" class="detail-input">-->
                <!--<el-option v-for="item in fileTypeOptions" :key="item.value"-->
                           <!--:value="item.value"-->
                           <!--:label="item.label">-->
                <!--</el-option>-->
              <!--</el-select>-->
            </div>
          </div>
          <div class="detail">
            <div class="block">
              <span class="input-label">起始时间：</span>
              <el-date-picker
                @change="searchFirst()"
                class="detail-input"
                value-format="yyyy-MM-dd"
                v-model="time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="table">
      <el-table
        border
        @selection-change="handleSelectionChange"
        resizable
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="virtualId"
          label="序号"
          >
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.virtualId)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="档号"
          >
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.id)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="rollId"
          label="卷号">
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.rollId)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileId"
          label="文号">
        </el-table-column>
        <el-table-column
          prop="responsePerson"
          label="责任人">
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.responsePerson)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="题名">
          <template slot-scope="scope">
            <span v-if="scope.row.fileColor == 'red'" style="color: #F56C6C">{{ scope.row.title }}</span>
            <span v-else-if="scope.row.fileColor == 'blue'" style="color: #409EFF">{{ scope.row.title }}</span>
            <span v-else-if="scope.row.fileColor == 'green'" style="color: #67C23A">{{ scope.row.title }}</span>
            <span v-else-if="scope.row.fileColor == 'yellow'" style="color: #E6A23C">{{ scope.row.title }}</span>
            <span v-else>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="密级">
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.level)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pageCount"
          label="页数">
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.pageCount)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="secretDate"
          label="保密年限(年)"
          >
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.secretDate)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="date"
          label="日期"
          >
          <template slot-scope="scope">
            <span v-html="showDate(scope.row.date)" ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          >
          <template slot-scope="scope">
            <!--<el-input @keyup.enter.native.prevent="changeNote(scope.row.virtualId, scope.row.id)" v-model="scope.row.note" placeholder="请输入内容"></el-input>-->
            <el-select v-if="scope.row.note === '借阅' || scope.row.note === '销毁' || scope.row.note === '其他'"
                       v-model="scope.row.note"
                       placeholder="请选择"
                       @change="changeNote(scope.row.note, scope.row.virtualId)" >
              <el-option v-for="item in noteOptions" :key="item.value"
                         :value="item.value"
                         :label="item.label">
              </el-option>
            </el-select>
            <el-input v-else
                      v-model="scope.row.note"
                      @keyup.enter.native.prevent="changeNote(scope.row.note, scope.row.virtualId)" ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-if="superShow == 'true'"
          label="操作"
          fixed="right"
          width="80">
          <template slot-scope="scope">
            <el-button @click="openUpdate(scope.row)" type="warning" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size = '15'
        :total="count"
        :page-count = 'pageCount'
        :current-page="page"
      @current-change="changePage">
      </el-pagination>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="insertShow" @open="openDialog" title="新增">
        <div class="detail_father">
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">档号：</span>
              <el-input class="detail-input" v-model="dialogData.id"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">文号：</span>
              <el-input class="detail-input" v-model="dialogData.fileId"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">卷号：</span>
              <el-input class="detail-input"  v-model="dialogData.rollId"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">责任人：</span>
              <el-input class="detail-input" v-model="dialogData.responsePerson"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">题名：</span>
              <el-input class="detail-input" v-model="dialogData.title"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">页数：</span>
              <el-input class="detail-input" type="number"  v-model="dialogData.pageCount"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">日期：</span>
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="dialogData.date">
              </el-date-picker>
            </div>
            <div class="detail-item">
              <span class="input-label">保密年限(0-无；-1-永久)：</span>
              <!--<el-input class="detail-input" @change="numLimit" min="1" type="number" v-model="dialogData.secretDate"></el-input>-->
              <SelectInput :local-options = 'options' placeholder = '请输入大于等于-1的数字' v-model="dialogData.secretDate"></SelectInput>
            </div>
            <div class="detail-item">
              <span class="input-label">备注：</span>
              <!--<el-input class="detail-input"  v-model="dialogData.note"></el-input>-->
              <el-select v-if="dialogData.note === '借阅' || dialogData.note === '销毁' || dialogData.note === '其他'" v-model="dialogData.note" placeholder="请选择"  class="detail-input">
                <el-option v-for="item in noteOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
              <el-input v-else class="detail-input"   v-model="dialogData.note"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label" >文件类型：</span>
              <el-select  placeholder="请选择" class="detail-input" v-model="dialogData.fileType" style="width: 100%">
                <el-option v-for="item in fileTypeOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="detail-item">
              <span class="input-label">密级：</span>
              <el-select placeholder="请选择" class="detail-input" v-model="dialogData.level" style="width: 100%">
                <el-option v-for="item in levelOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="detail-item">
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insertShow = false">取 消</el-button>
          <el-button type="primary" @click="_insertClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="updateShow"  title="更新">
        <div class="detail_father">
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">档号：</span>
              <el-input class="detail-input" v-model="dialogData.id"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">文号：</span>
              <el-input class="detail-input" v-model="dialogData.fileId"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">卷号：</span>
              <el-input class="detail-input"  v-model="dialogData.rollId"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">责任人：</span>
              <el-input class="detail-input" v-model="dialogData.responsePerson"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">题名：</span>
              <el-input class="detail-input" v-model="dialogData.title"></el-input>
            </div>
            <div class="detail-item">
              <span class="input-label">页数：</span>
              <el-input class="detail-input" type="number"  v-model="dialogData.pageCount"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label">日期：</span>
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="dialogData.date">
              </el-date-picker>
            </div>
            <div class="detail-item">
              <span class="input-label">保密年限(0-无；-1-永久)：</span>
              <!--<el-input class="detail-input" @change="numLimit" type="number"   v-model="dialogData.secretDate"></el-input>-->
              <SelectInput :local-options = 'options' placeholder = '请输入大于等于-1的数字' v-model="dialogData.secretDate"></SelectInput>
            </div>
            <div class="detail-item">
              <span class="input-label">备注：</span>
              <!--<el-input class="detail-input"  v-model="dialogData.note"></el-input>-->
              <el-select v-if="dialogData.note === '借阅' || dialogData.note === '销毁' || dialogData.note === '其他'" v-model="dialogData.note" placeholder="请选择"  class="detail-input">
                <el-option v-for="item in noteOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
              <el-input v-else class="detail-input"   v-model="dialogData.note"></el-input>
            </div>
          </div>
          <div class="detail">
            <div class="detail-item">
              <span class="input-label" >文件类型：</span>
              <el-select  placeholder="请选择" class="detail-input" v-model="dialogData.fileType" style="width: 100%">
                <el-option v-for="item in fileTypeOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="detail-item">
              <span class="input-label">密级：</span>
              <el-select placeholder="请选择" class="detail-input" v-model="dialogData.level" style="width: 100%">
                <el-option v-for="item in levelOptions" :key="item.value"
                           :value="item.value"
                           :label="item.label">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updateShow = false">取 消</el-button>
          <el-button type="primary" @click="_updateClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {search, exportString, importExcel, insertClick, updateClick, softDelete} from 'api/fileDetail'
  import * as config from 'api/config'
  import SelectInput from '@/components/SelectInput/SelectInput'
  export default {
    name: 'fileDetail',
    mounted () {
      this._search()
    },
    watch: {
      '$route' (to, from) {
        console.log(this.$route.params.fileType)
        this.fileTypeFlag = this.$route.params.fileType
        this.searchFirst()
      },
      tableData: function () {
        const search = this.concatField
        if (search) {
          return this.tableData.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    methods: {
      numLimit () {
        // console.log(this.dialogData.secretDate)
        if (this.dialogData.secretDate < 0) {
          this.dialogData.secretDate = 0
        }
      },
      searchFirst () {
        this.page = 1
        this._search()
      },
      _search () {
        let data = {
          page: this.page,
          concatField: this.concatField,
          fileId: this.fileId,
          virtualId: this.virtualId,
          id: this.id,
          responsePerson: this.responsePerson,
          start: this.time[0],
          end: this.time[1],
          title: this.title,
          level: this.level,
          note: this.note,
          fileType: this.fileType
        }
        search(data).then(res => {
          if (res.data.status === config.ERR_OK) {
            this.tableData = res.data.data
            this.count = res.data.count
            this.pageCount = res.data.pageCount
          } else {
            this.tableData = []
            this.pageCount = 1
          }
        })
      },
      showDate (val) {
        val = val + ''
        if (val.indexOf(this.concatField) !== -1 && this.search !== '') {
          return val.replace(new RegExp(this.concatField, 'g'), '<font color="#f00">' + this.concatField + '</font>')
        } else {
          return val
        }
      },
      changePage (val) {
        this.page = val
        this._search()
      },
      exportIP (event) {
        if (!this.time) {
          this.time = ['', '']
        }
        let str = exportString + `?id=${this.id}&fileId=${this.fileId}&responsePerson=${encodeURIComponent(this.responsePerson)}&title=${encodeURIComponent(this.title)}&level=${this.level}&start=${this.time[0]}&end=${this.time[1]}&note=${encodeURIComponent(this.note)}&fileType=${this.fileType}&concatField=${encodeURIComponent(this.concatField)}`
        event.target.href = str
      },
      importFile (event) {
        let fd = new FormData()
        fd.append('file', event.target.files[0])
        fd.append('fileType', this.fileType)
        let con = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        importExcel(fd, con).then(res => {
          if (res.data.status === config.ERR_OK) {
            this.searchFirst() // 刷新数据
            this.insertShow = false // 关闭弹窗
            this.$alert(res.data.msg, '提示')
          } else {
            this.$alert(res.data.msg, '提示')
          }
        })
        document.getElementById('file').value = ''
      },
      _softDelete () {
        if (this.multipleSelection.length === 0) {
          this.$alert('请先选择待删除项', '提示')
          return
        }
        let data = {
          virtualId: []
        }
        this.multipleSelection.forEach((item, i) => {
          data.virtualId.push(item.virtualId)
        })
        softDelete(data).then(res => {
          if (res.data.status === config.ERR_OK) {
            this._search() // 刷新数据
            this.$msgbox({
              message: res.data.msg
            })
          } else {
            this.$alert(res.data.msg, '提示')
          }
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      _insertClick () {
        // let data = {
        //   id: this.dialogData.id,
        //   fileId: this.dialogData.fileId,
        //   rollId: this.dialogData.rollId,
        //   responsePerson: this.dialogData.responsePerson,
        //   title: this.dialogData.title,
        //   level: this.dialogData.level,
        //   date: this.dialogData.date,
        //   secretDate: this.dialogData.secretDate,
        //   note: this.dialogData.note,
        //   fileType: this.dialogData.fileType,
        //   pageCount: this.dialogData.pageCount
        // }
        if (this.dialogData.secretDate < -1 || this.dialogData.secretDate > 999) {
          this.$alert('保密年限只能大于等于-1且小于1000', '提示')
          return
        }
        insertClick(this.dialogData).then(res => {
          if (res.data.status === config.ERR_OK) {
            this.searchFirst() // 刷新数据
            this.$msgbox({
              message: res.data.msg
            })
            this.insertShow = false
          } else {
            this.$alert(res.data.msg, '提示')
          }
        })
      },
      _updateClick () {
        // let data = {
        //   virtualId: this.dialogData.virtualId,
        //   id: this.dialogData.id,
        //   fileId: this.dialogData.fileId,
        //   rollId: this.dialogData.rollId,
        //   responsePerson: this.dialogData.responsePerson,
        //   title: this.dialogData.title,
        //   level: this.dialogData.level,
        //   date: this.dialogData.date,
        //   secretDate: this.dialogData.secretDate,
        //   note: this.dialogData.note,
        //   fileType: this.dialogData.fileType,
        //   pageCount: this.dialogData.pageCount
        // }
        if (this.dialogData.secretDate < -1 || this.dialogData.secretDate > 999) {
          this.$alert('保密年限只能大于等于-1且小于1000', '提示')
          return
        }
        updateClick(this.dialogData).then(res => {
          if (res.data.status === config.ERR_OK) {
            this._search() // 刷新数据
            this.$msgbox({
              message: res.data.msg
            })
            this.updateShow = false
          } else {
            this.$alert(res.data.msg, '提示')
          }
        })
      },
      openDialog () {
        this.dialogData = {
          id: '',
          fileId: '',
          rollId: '',
          responsePerson: '',
          title: '',
          level: '无',
          date: '',
          secretDate: '',
          note: '',
          fileType: '',
          pageCount: ''
        }
      },
      openUpdate (row) {
        this.updateShow = true
        this.dialogData = {
          virtualId: row.virtualId,
          id: row.id,
          fileId: row.fileId,
          rollId: row.rollId,
          responsePerson: row.responsePerson,
          title: row.title,
          level: row.level,
          date: row.date,
          secretDate: row.secretDate,
          note: row.note,
          fileType: row.fileType,
          pageCount: row.pageCount
        }
      },
      changeNote (note, virtualId) {
        let data = {
          virtualId: virtualId,
          note: note
        }
        updateClick(data).then(res => {
          if (res.data.status === config.ERR_OK) {
            this._search() // 刷新数据
            this.$message({
              message: '备注修改成功'
            })
          } else {
            this.$alert('修改失败', '提示')
          }
        })
      }
    },
    data () {
      return {
        superShow: localStorage.getItem('super') || false,
        insertShow: false,
        updateShow: false,
        dialogData: {
          id: '',
          fileId: '',
          rollId: '',
          responsePerson: '',
          title: '',
          level: '',
          date: '',
          secretDate: '',
          note: '',
          fileType: '',
          pageCount: ''
        },
        file: '',
        isShow: false,
        page: 1,
        pageCount: 1,
        count: 1, // 总条数
        concatField: '',
        fileId: '',
        virtualId: '',
        id: '',
        responsePerson: '',
        title: '',
        level: '',
        time: '',
        note: '',
        fileTypeFlag: this.$route.params.fileType,
        fileTypeMap: {
          '0': '',
          '1': '自拟文件',
          '2': '内部传真',
          '3': '机要文件',
          '4': '密码电报',
          '5': '县级文件'
        },
        levelOptions: [
          {
            value: '无',
            label: '无'
          },
          {
            value: '绝密',
            label: '绝密'
          },
          {
            value: '机密',
            label: '机密'
          },
          {
            value: '秘密',
            label: '秘密'
          },
          {
            value: '内部',
            label: '内部'
          }
        ],
        fileTypeOptions: [
          {
            value: '',
            label: '请选择'
          },
          {
            value: '自拟文件',
            label: '自拟文件'
          },
          {
            value: '内部传真',
            label: '内部传真'
          },
          {
            value: '机要文件',
            label: '机要文件'
          },
          {
            value: '密码电报',
            label: '密码电报'
          },
          {
            value: '县级文件',
            label: '县级文件'
          }
        ],
        noteOptions: [
          {
            value: '借阅',
            label: '借阅'
          },
          {
            value: '销毁',
            label: '销毁'
          },
          {
            value: '其他',
            label: '其他'
          },
          {
            value: '',
            label: '自行输入'
          }
        ],
        tableData: [],
        multipleSelection: [],
        options: [
          {name: '无', value: '0'},
          {name: '永久', value: '-1'}
        ]
      }
    },
    computed: {
      fileType: {
        get: function () {
          return this.fileTypeMap[this.fileTypeFlag]
        },
        set: function () {
        }
      }
    },
    components: {
      SelectInput
    }
  }
</script>

<style>
  .el-table th, .el-table thead tr{
    background: #f5f7fa!important;
    font-weight: bold;
    color: #000;
  }
</style>
<style scoped lang="stylus">
  .search-text
    color red
  .detail_father .detail-item  /deep/ .el-input__inner
    height 30px
    line-height 30px
  .detail_father .detail-item  /deep/ .el-input__icon
    line-height 30px
  .block .el-range-editor
    height 30px
    line-height 30px
  .block .el-date-editor /deep/ .el-range__icon
    line-height 25px
  .block .el-date-editor /deep/ .el-range-separator
    width 7%
    line-height 25px
  .slide-enter-active,.slide-leave-active
    transition: all .3s ease
  .slide-enter, .slide-leave-to
    transform: translateY(-10px)
    opacity: 0
  .detail-container
    .search
      .concatField
        overflow hidden
        .el-input
          width 400px
        .list_menu
          overflow: hidden
          float right
          width 40%
          li
            background #e6a23c
            font-size 14px
            border-radius 4px
            text-align center
            color #fff
            width 70px
            line-height 40px
            margin-right 10px
            float right
            font-size 14px
            &:last-child
              width 80px
              text-align right
            &:hover
              cursor pointer
              /*text-decoration underline*/
            .inputParent
              position relative
              text-align center
              display block
              .inputstyle
                position absolute
                width 70px
                height 40px
                top 0
                right  0
                opacity 0
                cursor inherit
                border none
      .detail_father
        border-top: 1px dashed #ddd
        margin-top: 25px
        .detail
          display flex
          margin-top 20px
          .detail-item
            flex 1
            .el-input
              display inline-block
              width auto
            .input-label
              font-size 14px
              color #666
          .block
            .input-label
              font-size 14px
              color #666
    .table
      margin 30px 0
    .page
      text-align center
      margin 25px 0 50px 0
    .dialog
      .detail
        display flex
        margin 15px 0
        .detail-item
          flex 1
          padding 0 15px
          .el-date-editor.el-input, .el-date-editor
            width auto
</style>
