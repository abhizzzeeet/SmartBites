export class Order {
  constructor(
    public itemId: number | null = null,
    public restaurantId: number | null = null,
    public restaurantName: string = '',
    public userId: number | null = null,
    public userName: string = '',
    public itemName: string = '',
    public quantity: number | null = null,
    public status: string = '',
    public createdAt?: string,
    public updatedAt?: string
  ) {}
}
