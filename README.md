[![Test](https://github.com/1maximsafronov/start-project-template/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/1maximsafronov/start-project-template/actions/workflows/test.yml)

# Стартовый шаблон для вёрстки сайтов



## В набор входит



- Сборка проекта на **Gulp**
- Стили на **Scss**
- Оптимизация графики
- Создание WebP изображений из jpg и png
- Минификация кода

## Как пользоваться



```bash
npm install

Установка зависимостей проекта.
```

- Файлы с разметкой  `*.html` хранить в папке `./src/html/`.
- Файлы стилей Sass модули, стили компонентов хранить в папке `./src/components/` и подключать в файл `./src/sass/style.scss`.
- Sass переменные хранить в файле `./src/sass/global/variables.scss`.
- Миксины (`@mixin name {}`) хранить в файле `./src/sass/global/mixins.scss`

```bash
npm start

Запускает проекта в режиме "разработки", 
происходит сборка проекта в папку /build 
и запуск локального сервера с наблюдателями за изменением 
файлов *.html, *.scss, *.js
```

```bash
npm run build

Запускает сборку всего проекта в папку /build
```

```bash
npm run test

Запускает тесты на ошибки editorconfig, stylelint, htmlhint
```

```bash
npm run publish

Команда отвечает за публикацию проекта на Gh-Pages
сначала запускается сборка проекта, 
потом создаётся ветка репозитория gh-pages для публикации на github.com
```

```bash
npm run clean 

Очищает папку /build
```

В файле `package.json` можно изменить название проекта, имя автора, описание и версию проекта

```json
{
  "name": "project-name",
  "author": "author-name",
  "description": "project-description",
  "version": "1.0.0",
  ...
}
```

## Структура проекта



```bash
build/             <<-- папка куда собирается проект
gulp/              <<--  настройки задач для сборщика Gulp
src/               <<-- рабочая папка для исходников проекта
.editorconfig
.eslintigore
.gitattributes
.gitignore
.htmlhintrc
.stylelintrc      
csscomb.json
Dependencies.md  <<-- файл с описанными зависимостями
gulpfile.js      <<-- файл с настройками для Gulp
LICENSE
package-lock.json
package.json
```

## Структура основной рабочей папки `/src`



Все исходники для сборки проекта хранятся в папке `/src`

```bash
src/
├─ fonts/                    <<-- папка для локальных шрифтов
├─ html/                     <<-- папка для файлов *.html
├─ img/                      <<-- папка для изображений
├─ js/                       <<-- папка для JS скриптов
└─ sass/                     <<-- пака для Sass стилей в синтаксисе Scss
    ├─ components/            <<-- папка для scss компонентов (БЭМ блоков)
    ├─ global/
    │ ├─ fonts.scss.          <<-- файл для подключения локальных шрифтов в css 
    │ ├─ global.scss          <<-- файл глобальных стилей (например для html, body, img)
    │ ├─ mixins.scss          <<-- файл для Sass миксинов
    │ ├─ variables.scss       <<-- файл для всех Sass переменных проекта
    │ └─ visually-hidden.scss <<-- файл css класса для доступного скрытия 
    │														  элементов страницы (class="visually-hidden")
    └─ style.scss             <<-- файл в который подключаются все Scss модули
```
