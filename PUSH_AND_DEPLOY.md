# Как обновить сайт на Vercel (пуши не проходят — делаем так)

Ваши изменения есть только у вас на диске. Чтобы Vercel обновился, код должен попасть на GitHub. Ниже — два рабочих способа.

---

## Способ 1: Пуш с токеном (рекомендуется)

Так Git не будет спрашивать логин/пароль в обычном виде, и пуш обычно проходит.

### Шаг 1. Создайте токен GitHub

1. Откройте: **https://github.com/settings/tokens**
2. **Generate new token** → **Generate new token (classic)**
3. Название: например `vercel-push`
4. Срок: 90 days или No expiration
5. Поставьте галочку **repo**
6. Нажмите **Generate token** и **скопируйте токен** (показывается один раз).

### Шаг 2. В терминале в папке проекта

Подставьте вместо `ВАШ_ЛОГИН` и `ВАШ_ТОКЕН` свои данные (логин GitHub и вставленный токен):

```powershell
cd "c:\Users\elias_PC\Desktop\Новая папка (2)"

git remote set-url origin https://ВАШ_ЛОГИН:ВАШ_ТОКЕН@github.com/alinagdm/transmarine.git
git push origin main
```

Пример (не используйте эти данные):  
`git remote set-url origin https://alinagdm:ghp_xxxx@github.com/alinagdm/transmarine.git`

### Шаг 3. После успешного пуша — уберите токен из URL

```powershell
git remote set-url origin https://github.com/alinagdm/transmarine.git
```

Через 1–2 минуты Vercel подхватит новый коммит и задеплоит сайт.

---

## Способ 2: Обновить файлы прямо на GitHub

Если пуш так и не получается, можно внести те же правки в репозитории на GitHub — Vercel соберёт проект по ним.

1. Откройте: **https://github.com/alinagdm/transmarine**
2. Зайдите в нужный файл, например:  
   `src/App.css` или `src/components/Services/Services.css` или `src/components/History/History.css`
3. Нажмите иконку **карандаша (Edit)**
4. Вставьте актуальное содержимое файла из вашей папки (Cursor/VS Code)
5. Внизу нажмите **Commit changes** → **Commit changes**
6. Повторите для всех изменённых файлов.

После коммитов на GitHub Vercel сам запустит деплой.

---

## Проверка

- Коммиты: **https://github.com/alinagdm/transmarine/commits/main**
- Деплои Vercel: **https://vercel.com/dashboard** → проект → **Deployments**
