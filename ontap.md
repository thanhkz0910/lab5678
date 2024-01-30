Link https://angular.io/docs

## Day 1: Khởi tạo Project

- Cài Angular CLI: <br>
  npm install -g @angular/cli ( sử dụng ng) <br>
- Tạo Project: <br>
  ng new project_name <br>
  cd my-app <br>
  ng serve --open <br>

### Add tailwind css:

- Cài thư viện tailwind: <br>
  npm install -D tailwindcss postcss autoprefixer <br>
  npx tailwindcss init <br>
- Add content trong taildwind config: <br>
  content: [
  "./src/**/*.{html,ts}",
  ], <br>
- Add style.css <br>
  @tailwind base; <br>
  @tailwind components; <br>
  @tailwind utilities; <br>

### Create components

ng generate component [name] <br>
ng g c [name] <br>

### Component (4 file)

- css <br>
- html <br>
- spec.ts: test <br>
- component.ts: xử lý logic <br>

## Day 2:

- Sử dụng NgFor: duyệt qua phần tử trong danh sách (map) <br>
- imports: [NgFor] <br>
- \*ngFor="let item of itemList" <br>
- Truyền dữ liệu từ cha -> con <br>
  [productChild] = "productParent" <br>
  ### Data binding: <br>
- {{expression}} : trong component.ts -> html (view) <br>
- [target]="expression": <br>
  the html: src (img), href (a): [src]= "imgSrc" <br>
  component cha => con: [productChild] = "productParent" <br>

  ## Day 3: UI + Ghép API

  - Call Api <br>
  - Tạo folder services: <br>
  - ng g s [name] <br>
  - VD: ng g s services/product <br>
    - http = inject(HttpClient) <br>
    - Viết các function: <br>
    - getProductList(): http.get(apiUrl); <br>
  - Call API: page Home <br>
  - inject(ProductService) <br>
  - ngOnInit (chạy sau render UI) : function call api <br>
  - VD: productService // service <br>
    .getProductList() // function <br>
    .subscribe(data -> cb functions) // hứng data vào biến của mình <br>

  - Cấu hình app config: thêm trong provider: provideHttpClient()

  ## DAY 4: Lab 2

  - component sidebar: <br>
  - ng g c components/sidebar <br>
  - ng g c pages/admin/products <br>
  - ng g c layouts/layout-admin <br>
  - app.routes: <br>
    {
    path: 'admin',<br>
    component: LayoutAdminComponent, <br> // sử dụng component Layout
    children: [ <br> // gồm paths của con nằm trong layout
    { path: 'products', component: ProductsComponent }, <br> // path + value = pathCha/pathCon -> admin/products
    { path: 'products/add', component: ProductAddComponent }, <br> -> admin/products : Lab 3
    { path: 'products/:id', component: ProductEditComponent } <br> -> admin/products/edit/:id : Lab 4
    ],
    }, <br>

  - page admin/products: table render ProductList (edit, remove) <br>
  - Nut create product <br>

  - Update product service: getProductListAdmin() <br>
  - Call API render UI <br>
    - fakeapi ko có CRUD <br>
    - https://hoadv-nodejs.vercel.app/api/products (CRUD) <br>
    - Api Nodejs <br> (Option 1)
    - Api JSon Server <br> (Option 2)
