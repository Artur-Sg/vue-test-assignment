export default interface Good {
  id: number;
  name: string;
  position: number;
  cost: number;
  category_id?: number;
  category?: string;
}
