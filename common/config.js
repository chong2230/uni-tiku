let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://test-practice.youzhi.tech'
}else{
    // 生产环境
    url_config = 'https://practice.youzhi.tech'
}

export default url_config