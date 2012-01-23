({"name":"b-text","mods":[{"name":"type","vals":[{"name":"global","techs":[{"name":"css"},{"name":"ru.title.txt"},{"name":"ru.wiki"}],"title":"Блок для работы с текстом с глобальными правилами стилизации.","bemjsonDesc":{"block":"b-text","content":[{"elem":"p","content":["Позволяет стилизировать текст, редактируемый через всевозможные wysiwyg редакторы."]},{"elem":"p","content":["Не рекомендован к использованию, т.к. его реализация не соответвует BEM подходу."]}]}}],"title":"","bemjsonDesc":""}],"techs":[{"name":"bemhtml"},{"name":"css"},{"name":"en.title.txt"},{"name":"ru.title.txt"},{"name":"ru.wiki"}],"title":"Блок для работы с текстом","bemjsonDesc":{"block":"b-text","content":[{"elem":"p","content":["Блок ",{"tag":"tt","content":["b-text"]}," обеспечивает единообразие оформления."]},{"elem":"p","content":["Позволяет задавать произвольные элементы, которые продуцируются в одноименные html-теги."]},{"elem":"p","content":["Для содержимого блока определены базовые стили заголовков, списков, начертания текста.",{"tag":"br"}," Каждому элементу блока соотвествует в css реализации свой класс. Это позволяет избежать каскада при использовании блока, что в свою очередь уменьшает reflow time страницы."]}]}})