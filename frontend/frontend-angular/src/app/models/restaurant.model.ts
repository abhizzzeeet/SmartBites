export class Restaurant {
  constructor(
    public restaurantId: number | null = null,
    public restaurantName: string = '',
    public address: string = '',
    public city: string = '',
    public state: string = '',
    public latitude: string = '',
    public longitude: string = '',
    public pincode: string = '',
    public userId: number | null = null
  ) {}
}
