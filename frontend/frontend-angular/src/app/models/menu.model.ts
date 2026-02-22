export class Menu {
  constructor(
    public itemId: number | null = null,
    public restaurantId: number | null = null,
    public restaurantName: string = '',
    public itemName: string = '',
    public basePrice: number = 0,
    public quantityType: string = '',
    public quantityPrices: any = {},
    public description: string = '',
    public availability: boolean = true,
    public category: string = ''
  ) {}
}
