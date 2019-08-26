<template>
    <div>
        <h1>物品列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID"  table-width='200px'></el-table-column>
            <el-table-column prop="name" label="物品名称" ></el-table-column>
            <el-table-column prop="name" label="图标" >
                <template slot-scope="scope">
                    <img :src="scope.row.icon" alt="" style="height:3rem">
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="$router.push(`/items/edit/${scope.row._id}`)" type="primary" size="small">编辑</el-button>
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
            const res = await this.$http.get('rest/items')
            this.items=res.data
        },

        async remove(item){
            this.$confirm(`是否确定要删除栏目"${item.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                const res= await this.$http.delete(`rest/items/${item._id}`)
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

