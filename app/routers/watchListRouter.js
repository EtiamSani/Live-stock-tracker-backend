const { Router } = require("express");
const watchListRouter = Router();
const watchListController = require("../controllers/watchListController");

watchListRouter.get("/", watchListController.getAll);
watchListRouter.post("/", watchListController.creatList);
watchListRouter.put("/:listId", watchListController.updateList);
watchListRouter.get(
  "/investor/:investorId",
  watchListController.findAllWatchlistOfAnInvestor
);
watchListRouter.get("/:listId", watchListController.findOneListWithStocks);
watchListRouter.delete("/:listId", watchListController.deleteList);
watchListRouter.delete(
  "/deletewithcompanies/:listId",
  watchListController.deleteListWithCompanies
);
watchListRouter.post(
  "/:listId/company/:companyId",
  watchListController.addCompanyInWatchlist
);
watchListRouter.delete(
  "/:watchlistId/company/:companyId",
  watchListController.deleteCompanyFromWatchlist
);

module.exports = watchListRouter;
