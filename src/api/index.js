import requests from "@/api/request";

export const reqList = (data) => {
    return requests({
        url:"llm",
        method:"post",
        data:data,
    })
}

export const reqPage = (pdf_name, search_str) => {
    return requests({
        url:"search-in-pdf",
        method:"get",
        params:{
            pdf_name:pdf_name,
            search_str:search_str
        }
    })
}