const spanish_locale = {
  LOG_IN: 'Inicia sesión',
  REGISTER: 'Registrarse',
  SELECT_LANGUAGE_HEADER: 'Selecciona tu lenguaje',
  SPANISH: 'Español',
  ENGLISH: 'Ingles',
  LOCALE: 'es-ES',
  SEARCH: 'Buscar',
  SEARCH_PLACEHOLDER: 'Nombre del producto',
  CATEGORIES: 'Categorías',
  SEARCH_PRODUCT_BY_BRAND: 'Explora nuestras marcas',
  UNIT_PRICE: 'Precio unitario',
  ADD_TO_CART: 'Añadir al carrito',
  PRODUCTS: 'Productos',
  CART: 'Carrito',
  DOWNLOAD_CART_DATA: 'Descargar datos del carrito',
  EDIT: 'Editar',
  DELETE: 'Borrar',
  DELETE_ALL_FROM_CART: 'Borrar todos los productos',
  TOTAL_CART: 'Precio total',
  PERSONAL_INFO: 'Información personal',
  COMPANY_OCCUPATION: 'Compañia / Ocupación',
  FIRST_NAME: 'Nombre',
  LAST_NAME: 'Apellido',
  EMAIL: 'Correo electrónico',
  EMAIL_EXAMPLE: 'correo@dominio',
  PASSWORD: 'Contraseña',
  ADDRESS: 'Dirección',
  PHONE_NUMBER: 'Número de teléfono',
  COUNTRY: 'País',
  STATE: 'Estado',
  CITY: 'Ciudad',
  NEXT: 'Siguiente',
  PREVIOUS: 'Anterior',
  COMPANY_NAME: 'Nombre de la compañia',
  SUBMIT: 'Enviar',
  ORGANIZATION_TYPE: 'Tipo de organización',
  PRIVATE_CORPORATION: 'Corporación privada',
  PUBLIC_CORPORATION: 'Corporación pública',
  LLC: 'LLC',
  BUSINESS_STYLE: 'Estilo del negocio',
  DISTRIBUTOR: 'Distribuidor',
  STORE: 'Tienda',
  YEAR_STABLISHED: 'Año de creación',
  ZIP_CODE: 'Código Zip',
  SUBMITTED_DATA: 'Datos subidos de manera exitosa',
  HAVE_YOU_REGISTERED_ALREADY: 'Ya te has registrado? Inicia sesión aquí',
  REQUIRED_FIELD: 'Este campo es requerido',
  MANAGE_ACCOUNTS: 'Gestionar cuentas',
  TABLE_PAGINATION_COUNT: '{from}-{to} de {count}',
  ACTIONS: 'Acciones',
  ROWS_PER_PAGE: 'Filas por página',
  ROWS: 'Filas',
  VERIFIED: 'Verificado',
  EMPTY_FIELDS: 'Campos vacios',
  USER_REGISTERED:
    'Usuario registrado, por favor, espere 1 dia hábil mientras verificamos su información',
  DELETE_USER_MESSAGE: 'Estás seguro de que deseas borrar este usuario?',
  INFORMATION_ABOUT: (firtName, lastName) =>
    `Informacion sobre ${firtName} ${lastName}`,
  USER_NOT_VERIFIED:
    'Usuario no verificado, espere al menos 1 día hábil antes de iniciar sesión',
  WRONG_CREDENTIALS: 'Correo electrónico o contraseña incorrectos',
  ADDED_TO_CART: 'Producto agregado al carrito',
  NUMBER_OF_ITEMS: 'Número de productos',
  EXCEEDED_PRODUCT_LIMIT: (maxQty) => `Cantidad máxima de producto disponible excedida(${maxQty})`,
  NO_PRODUCTS_IN_CART: 'No hay productos en el carrito',
};

export default spanish_locale;
