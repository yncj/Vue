<template>
    <div>
        <h1>管理员列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID"  table-width='200px'></el-table-column>
            <el-table-column prop="userName" label="用户名" ></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/admain_users/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
                    <el-button type="primary" size="small" @click='remove(scope.row)'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:[]
        }
    },
    methods:{
        async fetch(){
            const res = await this.$http.get('rest/admain_users')
            this.items=res.data
        },

        async remove(item){
            this.$confirm(`是否确定要删除用户"${item.userName}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                const res= await this.$http.delete(`rest/admain_users/${item._id}`)
                this.$message({
                type: 'success',
                message: '删除成功!'
                });
                this.fetch();
            })
        }
    },
    
    created(){
        this.fetch()
    }
}
</script>

