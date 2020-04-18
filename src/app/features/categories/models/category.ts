export interface Category {
    id: string;
    name: string;
    parent: Category;
    image: {
        id: string;
        url: string;
    };
}