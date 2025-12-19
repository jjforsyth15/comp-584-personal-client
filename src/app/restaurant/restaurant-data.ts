import { MenuItemData } from "../menu/menu-item-data";

export interface RestaurantData {
    id: number;
    name: string;
    menuItems: MenuItemData[];
}