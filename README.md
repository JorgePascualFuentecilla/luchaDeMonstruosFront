# Getting Started with Create React App
# Selección de Villanos y Monstruos

Este proyecto es una aplicación desarrollada en React que permite a los usuarios seleccionar un villano y un monstruo para realizar batallas. La interfaz incluye pantallas atractivas y funcionales para elegir personajes y llevar a cabo enfrentamientos.

## Características principales

- **Selección de Villanos:** Los usuarios pueden elegir entre diferentes villanos con imágenes ilustrativas.
- **Selección de Monstruos:** Los usuarios pueden seleccionar monstruos con atributos específicos.
- **Interfaz Estilizada:** Diseño visual mejorado para una experiencia de usuario atractiva.
- **API Local:** La aplicación consume datos de villanos y monstruos desde una API.

---

## Tecnologías utilizadas

- **Frontend:**
  - React
  - CSS (diseño responsivo)
- **Backend:**
  - API local para obtener datos de villanos y monstruos

---

## Estructura del proyecto

```
src/
├── assets/
│   ├── images/
│   │   ├── monsters/
│   │   └── villains/
│   └── styles/
│       └── styles.css
├── components/
│   ├── MonsterSelection.js
│   └── VillainSelection.js
├── App.js
└── index.js
```

### Descripción de carpetas

- **`assets/images`**: Contiene imágenes de villanos y monstruos.
- **`assets/styles`**: Almacena el archivo CSS con los estilos de la aplicación.
- **`components`**: Contiene los componentes principales para la selección de villanos y monstruos.

---

## Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   ```

2. Ve al directorio del proyecto:

   ```bash
   cd seleccion-villanos-monstruos
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Ejecuta el proyecto:

   ```bash
   npm start
   ```

5. Abre tu navegador y ve a:

   ```
   http://localhost:3000
   ```

---

## Uso

1. En la pantalla de inicio, selecciona un villano de la lista disponible.
2. Después, selecciona un monstruo de la lista correspondiente.
3. Procede con la batalla.

---

## Personalización

- **Estilos:** Puedes modificar el archivo `styles.css` ubicado en `src/assets/styles` para ajustar la apariencia de la aplicación.
- **Datos:** Los datos de villanos y monstruos se obtienen desde una API local. Puedes modificar las funciones `getVillains` y `getMonsters` en `api.js` para cambiar la fuente de datos.

---

## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama nueva para tu funcionalidad:
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Envía un pull request.

---

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

---

## Contacto

Si tienes alguna duda o sugerencia, no dudes en contactarme.

