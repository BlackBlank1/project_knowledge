import requests from "@/api/request";

export const reqSinglePaper = (data) => {
    return requests({
        url:"llm",
        method:"post",
        data:data,
    })
}

export const reqAllQA = (data) => {
    return requests({
        url:"llm-knowledge-base",
        method:"post",
        data:data
    })
}

export const reqGetPDF = (pdf_name) => {
    return requests({
        url:"get-pdf-file",
        method:"get",
        params:{
            pdf_name:pdf_name
        }
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

export const reqCatalogue = (pdf_name) => {
    return requests({
        url:"get-pdf-directory",
        method:"get",
        params:{
            pdf_name:pdf_name,
        }
    })
}