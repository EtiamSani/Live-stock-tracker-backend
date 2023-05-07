const companyDatamapper = require("../model/company");
const watchListDatamapper = require("../model/watchList");
const errors = require('../modules/errors');


const companyController = { 

    //ok
    getAllCompany : async (req,res) => {
        
        try {
            const getAllCompanies = await companyDatamapper.findAll()
            res.json(getAllCompanies)
            
            }catch(err) {
                errors.error500(res, err);
            }
    },
    //ok
    getOneCompany : async (req,res) => {
        const companyId = Number(req.params.companyId);
        try {
            const oneCompany = await companyDatamapper.findByPk(companyId)

            res.json(oneCompany)
            }catch(err) {
                errors.error500(res, err);
            }
    },
    //ok 
    creatCompany : async (req,res) => {

        const companyInfo = {
        
        name : req.body.name,
        symbol : req.body.symbol,
        entryprice : req.body.entryprice,
        
        }

        console.log(companyInfo)
        
        try {
            const oneCompany = await companyDatamapper.create(companyInfo)
            res.json(oneCompany)
            }catch(err) {
                errors.error500(res, err);
            }
    },
    //ok
    deleteCompany :  async (req,res) => {
        const companyId = Number(req.params.companyId);
        try {
            const deleteCompany = await companyDatamapper.delete(companyId)
            res.json(deleteCompany)
            }catch(err) {
                errors.error500(res, err);
            }
    },
    //ok
    updateEntryPrice : async (req,res) => {
        const id = req.params.companyId;
       
        const entryPriceData = {
            entryprice: req.body.entryprice, 
            name:req.body.name,
            symbol : req.body.symbol
        }
        console.log(entryPriceData)
        try {
            const updateEntryPrice = await companyDatamapper.update({id}, entryPriceData);
            console.log(updateEntryPrice)
            res.json(updateEntryPrice)
        } catch(err) {
            errors.error500(res, err);
        }
    },
    //ok
    findCompanyWithSymbol : async (req,res) => { 
        
        const symbol = req.params.symbol   
        console.log(symbol)
        
        const findCompanyWithSymbol = await companyDatamapper.findCompanyBySymbol(symbol)
        res.json(findCompanyWithSymbol)
    }
}

module.exports = companyController