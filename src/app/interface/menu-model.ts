export interface MenuModel {
   menuID: number;
  parentMenuID?: number; // Optional field (nullable in C#)
  title?: string;        // Optional field (nullable in C#)
  coreURL?: string;      // Optional field (nullable in C#)
  parentMenu?: MenuModel; // Optional field (nullable in C#), also of type MenuModel
  childMenus?: MenuModel[]; // Optional field, array of MenuModel
  isMRF?: number;
}
