import ApiService from "./service";

const ManualService = {
  GetModuleSelectList() {
    return ApiService.get("manual/GetModuleSelectList");
  },
  StateSelectList() {
    return ApiService.get("manual/StateSelectList");
  },
  LanguageSelectList() {
    return ApiService.get("manual/LanguageSelectList");
  },
  GenderSelectList() {
    return ApiService.get("manual/GenderSelectList");
  },
  GetAnswerTypeSelectList() {
    return ApiService.get("manual/GetAnswerTypeSelectList");
  },
  NotificationTypeSelectList() {
    return ApiService.get("manual/NotificationTypeSelectList");
  },
  StatusSelectList() {
    return ApiService.get("manual/StatusSelectList");
  },
  IdentityDocumentSelectList() {
    return ApiService.get("manual/IdentityDocumentSelectList");
  },
  SignOrganizationTypeSelectList(data = {}) {
    return ApiService.post(
      `manual/SignOrganizationTypeSelectList?incluceBusinessman`,
      data
    );
  },
  GetListByDocumentId(tableId: string | number, docId: string | number) {
    return ApiService.get(
      `DocumentChangeLog/GetListByDocumentId/${tableId}/${docId}`
    );
  },
};

export default ManualService;
