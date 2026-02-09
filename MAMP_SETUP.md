# Настройка MAMP для проекта TransMarine

## Шаги настройки:

1. **Установите MAMP** (если еще не установлен):
   - Скачайте с официального сайта: https://www.mamp.info/
   - Установите приложение

2. **Запустите MAMP**:
   - Откройте приложение MAMP
   - Нажмите "Start Servers"

3. **Настройте Document Root**:
   - В MAMP перейдите в Preferences → Web Server
   - Установите Document Root на: `/Users/alinagodm/Desktop/Transmarine/dist`
   - Или создайте символическую ссылку в папке htdocs MAMP

4. **Альтернативный способ (через htdocs)**:
   ```bash
   # Скопируйте папку dist в htdocs MAMP
   cp -r /Users/alinagodm/Desktop/Transmarine/dist /Applications/MAMP/htdocs/transmarine
   ```

5. **Откройте в браузере**:
   - http://localhost:8888/transmarine/
   - или http://localhost:8888/ (если настроили Document Root)

## После изменений в коде:

Каждый раз после изменения кода нужно пересобрать проект:
```bash
npm run build
```

Собранные файлы будут в папке `dist/`, которую MAMP будет раздавать.

## Для разработки (рекомендуется):

Вместо MAMP можно использовать встроенный Vite dev server:
```bash
npm run dev
```

Он автоматически обновляет страницу при изменениях и работает быстрее.
