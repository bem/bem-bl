# ================================ Константы

comma:=,
empty:=
space:=$(empty) $(empty)
pathsep:=/


# ================================ Переменные, задающие окружение

# NOTE: С обязательным / в конце, если значение не пустое
LEGO_PREFIX ?= bem-bl/

# NOTE: С обязательным / в конце, если значение не пустое
PRJ_PREFIX ?=

# NOTE: С обязательным / в конце, если значение не пустое (пока не работает)
BUILD_OUTPUT ?=

# Утилита bem из пакета bem-tools
BEM ?= bem

# ================================ Настройки процесса сборки

# Дефолные пути к технологиям
TECH_PATH ?= $(BEMBL_PREFIX)node_modules/bem/lib/techs/$(1).js

# Суффиксы файлов, генерируемых технологиями
TECH_SUFFIXES ?= $(1)
TECH_SUFFIXES_css ?= css ie.css
TECH_SUFFIXES_bemhtml ?= bemhtml.js

# Дефотный список страницы уровня
# $(1) - Директория уровня страницы: pages
LEVEL_PAGES ?= $(shell find $(1) $(pages_find_args))
LEVEL_PAGES_EXCLUDE ?=

# Уровни переопределения страницы
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Имя технологии для сборки
PAGE_LEVELS ?= $(call page_levels_lego,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(call page_levels_prj,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(call page_levels_pages,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(call page_levels_page,$(1),$(2),$(3),$(4),$(5),$(6))

# Уровни переопределения Лего
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Имя технологии для сборки
# XXX: Используется хак для pages: подключается bem-bl/blocks-desktop
# XXX: Используется костыль: подключается blocks*/blocks
PAGE_LEVELS_LEGO_PRE ?=

PAGE_LEVELS_LEGO ?= $(call remove_dupes,\
$(call PAGE_LEVELS_LEGO_PRE,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(wildcard $(BEMBL_PREFIX)bem-bl/blocks-common) \
$(wildcard $(BEMBL_PREFIX)bem-bl/$(call pages2level,$(2))) \
$(wildcard $(BEMBL_PREFIX)blocks-common) \
$(wildcard $(BEMBL_PREFIX)$(call pages2level,$(2))/blocks) \
$(wildcard $(BEMBL_PREFIX)$(call pages2level,$(2))) \
$(call PAGE_LEVELS_LEGO_POST,$(1),$(2),$(3),$(4),$(5),$(6)))

PAGE_LEVELS_LEGO_POST ?=

# Уровни переопределения проекта
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Имя технологии для сборки
PAGE_LEVELS_PRJ_PRE ?=

ifneq ($(BEMBL_PREFIX),$(PRJ_PREFIX))
PAGE_LEVELS_PRJ ?= $(call remove_dupes,\
$(call PAGE_LEVELS_PRJ_PRE,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(wildcard $(PRJ_PREFIX)blocks-common) \
$(if $(findstring pages,$(2)), \
$(wildcard $(PRJ_PREFIX)$(call pages2level,$(2))) \
$(wildcard $(PRJ_PREFIX)$(call pages2level,$(2))/blocks) \
$(wildcard $(PRJ_PREFIX)$(subst pages,blocks,$(2))) \
$(wildcard $(PRJ_PREFIX)$(subst pages,blocks,$(2))/blocks) \
) \
$(call PAGE_LEVELS_PRJ_POST,$(1),$(2),$(3),$(4),$(5),$(6)))
else
PAGE_LEVELS_PRJ ?=
endif

PAGE_LEVELS_PRJ_POST ?=

# Уровни переопределения уровня страницы проекта
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Имя технологии для сборки
PAGE_LEVELS_PAGES_PRE ?=

PAGE_LEVELS_PAGES ?= $(call remove_dupes,\
$(call PAGE_LEVELS_PAGES_PRE,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(wildcard $(2)/blocks) \
$(wildcard $(3)/blocks) \
$(call PAGE_LEVELS_PAGES_POST,$(1),$(2),$(3),$(4),$(5),$(6)))

PAGE_LEVELS_PAGES_POST ?=

# Уровни переопределения страницы проекта
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Имя технологии для сборки
PAGE_LEVELS_PAGE_PRE ?=

PAGE_LEVELS_PAGE ?= $(call remove_dupes,\
$(call PAGE_LEVELS_PAGE_PRE,$(1),$(2),$(3),$(4),$(5),$(6)) \
$(call resolve_bemlevels,$(5).bemlevels,$(4)) \
$(wildcard $(4)/blocks) \
$(call PAGE_LEVELS_PAGE_POST,$(1),$(2),$(3),$(4),$(5),$(6)))

PAGE_LEVELS_PAGE_POST ?=

# Локали, для которых нужно создавать <locale>.xml страницы
PAGES_LOCALES ?=

# Технологии, которые нужно генерировать для страниц
PAGES_TECHS ?=
PAGES_TECHS_bemjson.js ?= bemhtml css js
PAGES_TECHS_bemdecl.js ?= bemhtml css js

# Суффиксы файлов страниц, которые должны собираться при сборке страницы
PAGES_SUFFIXES ?=

# Суффиксы файлов страниц, которые нужно сжимать
PAGES_UNDERSCORE_SUFFIXES ?=

# Генерировать общий бандл для всех страниц уровня
GENERATE_COMMON_BUNDLE ?= false
COMMON_BUNDLE_NAME ?= common

# ================================ Внутренние переменные

# Параметры для поиска страниц
pages_find_args := -mindepth 1 -maxdepth 2 -type d -not \( -name '.svn' -prune -o -name '.bem' -prune -o -name 'blocks' -prune -o -name 'examples' -prune -o -name 'tests' -prune -o -name 'workindex' -prune \)

# Параметры для поиска блоков
blocks_find_args := -mindepth 1 -maxdepth 1 -type d -not \( -name '.svn' -prune -o -name '.bem' -prune -o -name 'common' -prune -o -name 'blocks' -prune \)


# ================================ Функции

# Удаляет дубликаты из списка значений, сохраняя порядок значений
remove_dupes = $(if $1,$(strip $(word 1,$1) $(call $0,$(filter-out $(word 1,$1),$1))))

# $(1) - Имя опции
# $(2) - Модификатор
get_opt_for_mod=$(if $($(1)_$(2)),$($(1)_$(2)),$(call $(1),$(2)))

# Возвращает список суффиксов для страницы
# $(1) - Директория уровня страницы: pages
# $(2) - Дочерняя директория страницы: pages/page
# $(3) - Директория страницы: pages/page/subpage
# $(4) - Идентификатор источника, из которого страница собирается: raw.xml, bemjson.js, bemdecl.js
pages_suffixes=$(or \
$(PAGES_SUFFIXES_$(4)_$(3)),\
$(PAGES_SUFFIXES_$(3)),\
$(PAGES_SUFFIXES_$(4)_$(2)),\
$(PAGES_SUFFIXES_$(2)),\
$(PAGES_SUFFIXES_$(4)_$(1)),\
$(PAGES_SUFFIXES_$(1)),\
$(PAGES_SUFFIXES_$(4)),\
$(PAGES_SUFFIXES)) \
$(foreach tech,$(call pages_techs,$(1),$(2),$(3),$(4)),$(call tech_suffixes,$(tech)))

# Уровни переопределения страницы
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Имя технологии для сборки
page_levels=$(or \
$(call PAGE_LEVELS_$(4),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_$(3),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_$(2),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS,$(1),$(2),$(3),$(4),$(5),$(6)))

page_levels_lego=$(or \
$(call PAGE_LEVELS_LEGO_$(4),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_LEGO_$(3),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_LEGO_$(2),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_LEGO,$(1),$(2),$(3),$(4),$(5),$(6)))

page_levels_prj=$(or \
$(call PAGE_LEVELS_PRJ_$(4),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PRJ_$(3),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PRJ_$(2),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PRJ,$(1),$(2),$(3),$(4),$(5),$(6)))

page_levels_pages=$(or \
$(call PAGE_LEVELS_PAGES_$(4),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PAGES_$(3),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PAGES_$(2),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PAGES,$(1),$(2),$(3),$(4),$(5),$(6)))

page_levels_page=$(or \
$(call PAGE_LEVELS_PAGE_$(4),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PAGE_$(3),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PAGE_$(2),$(1),$(2),$(3),$(4),$(5),$(6)),\
$(call PAGE_LEVELS_PAGE,$(1),$(2),$(3),$(4),$(5),$(6)))

# Языки для страницы
# $(1) - Директория уровня страницы: pages
# $(2) - Дочерняя директория страницы: pages/page
# $(3) - Директория страницы: pages/page/subpage
pages_locales=$(or \
$(call PAGES_LOCALES_$(3),$(1),$(2),$(3)),\
$(call PAGES_LOCALES_$(2),$(1),$(2),$(3)),\
$(call PAGES_LOCALES_$(1),$(1),$(2),$(3)),\
$(call PAGES_LOCALES,$(1),$(2),$(3)))

# Возвращает список технологий для страницы
# $(1) - Директория уровня страницы: pages
# $(2) - Дочерняя директория страницы: pages/page
# $(3) - Директория страницы: pages/page/subpage
# $(4) - Идентификатор источника, из которого страница собирается: raw.xml, bemjson.js, bemdecl.js
pages_techs=$(or \
$(PAGES_TECHS_$(4)_$(3)),\
$(PAGES_TECHS_$(3)),\
$(PAGES_TECHS_$(4)_$(2)),\
$(PAGES_TECHS_$(2)),\
$(PAGES_TECHS_$(4)_$(1)),\
$(PAGES_TECHS_$(1)),\
$(PAGES_TECHS_$(4)),\
$(PAGES_TECHS))

# Возвращает список расширений для страницы, которые нужно сжимать
# $(1) - Директория уровня страницы: pages
# $(2) - Дочерняя директория страницы: pages/page
# $(3) - Директория страницы: pages/page/subpage
pages_underscore_suffixes=$(or \
$(PAGES_UNDERSCORE_SUFFIXES_$(3)),\
$(PAGES_UNDERSCORE_SUFFIXES_$(2)),\
$(PAGES_UNDERSCORE_SUFFIXES_$(1)),\
$(PAGES_UNDERSCORE_SUFFIXES))

# Возвращает тип исходника для сборки страницы
# $(1) - Путь-префикс
# $(2) - Префикс для имен файлов страницы
# XXX: $(wildcard $(1)$(2).xml) — костыль для .xml примеров
get_page_source=$(if $(wildcard $(1)$(2).bemjson.js),bemjson.js,$(if $(wildcard $(1)$(2).raw.xml)$(wildcard $(1)$(2).xml),raw.xml,bemdecl.js))

# Возвращает путь до файла технологии по имени технологии
# $(1) - Имя технологии: xhtml, css или js
# Результат: path/to/xhtml.js, path/to/css.js или path/to/js.js
tech_path=$(call get_opt_for_mod,TECH_PATH,$(1))

# Возвращает список расширений по имени технологии
# $(1) - Имя технологии: xhtml, css или js
# Результат: xsl, css ie.css или js
tech_suffixes=$(call get_opt_for_mod,TECH_SUFFIXES,$(1))

find_dirs=$(shell find $(1) -type d -not \( -name '.svn' -prune \))

# Возвращает список всех .js файлов, для которых нужно сгенерировать jsdoc документацию
# $(1) - Директория для рекурсивного поиска: blocks/b-block
find_jsdoc_bem=$(shell find $(1) \
	-name '*.js' \
	-not -name '*.decl.js' \
	-not -name '*.deps.js' \
	-not -name '*.bemjson.js' \
	-not -name '*.ometajs.js' \
	-not -path '*/examples/*' \
	-not -path '*bem/techs/*' \
	| xargs grep -l 'BEM' | xargs grep -l '@lends')

# Возвращает список страниц для уровня
# $(1) - Директория уровня страницы: pages
level_pages=$(filter-out \
$(or \
$(call LEVEL_PAGES_EXCLUDE_$(1),$(1)),\
$(call LEVEL_PAGES_EXCLUDE,$(1))),\
$(or \
$(call LEVEL_PAGES_$(1),$(1)),\
$(call LEVEL_PAGES,$(1))))

pages2level=$(subst pages,blocks,$(call get_name,$(1)))

build_output=$(BUILD_OUTPUT)$(1)

levels2opts=$(foreach level,$(1),-l $(level))

read_file=$(if $(wildcard $(1)),$(shell cat $(1)))

resolve_bemlevels=$(foreach p,$(call read_file,$(1)),$(wildcard $(if $(2),$(2)/$(p),$(p))))

# Добавляет к каждому префиксу каждый суффикс через «.»
# $(1) - Префиксы: pages/page1/page1 pages/page2/page2
# $(2) - Суффиксы: js xsl
# Результат: pages/page1/page1.js pages/page2/page2.js pages/page1/page1.xsl pages/page2/page2.xsl
add_suffixes=$(foreach suffix,$(2),$(foreach prefix,$(1),$(prefix).$(suffix)))

# Возвращает директорию уровня блока по пути
# $(1) - Путь страницы: blocks/b-block или pages/page/blocks/b-block
# Результат: blocks или pages/page/blocks
get_block_level=$(call get_parent,$(1))

# Возвращает директорию уровня страницы по пути
# $(1) - Путь страницы: blocks/b-block, pages/page или pages/page/subpage
# Результат: blocks, pages или pages
get_page_level=$(firstword $(subst $(pathsep),$(space),$(1)))

# Возвращает путь страницы внутри уровня
# $(1) - Путь страницы: pages/page или pages/page/subpage
# Результат: page или page/subpage
get_page_subpath=$(subst $(space),$(pathsep),$(wordlist 2,3,$(subst $(pathsep),$(space),$(1))))

# Возвращает путь до родительской директории
# $(1) - Путь до директории: blocks/b-button, pages/page или pages/page/subpage
# Результат: blocks, pages или pages/page
get_parent=$(subst $(space),$(pathsep),$(strip $(subst $(pathsep),$(space),$(dir $(1)))))

# Возвращает название блока или страницы по пути
# $(1) - Путь блока или страницы: blocks/b-block, pages/page или pages/page/subpage
# Результат: b-block, page или subpage
get_name=$(notdir $(1))

# Из пути до директории блока или страницы делает префикс для файлов
# $(1) - Путь блока или страницы: blocks/b-block или pages/page/subpage
# Результат: blocks/b-block/b-block или pages/page/subpage
get_file_prefix=$(1)/$(call get_name,$(1))

# $(1) - Путь
# $(2) - Префикс
strip_prefix=$(shell echo "$(1)" | sed -e "s|^$(2)||")

# ================================ Функции динамической генерации целей

# Динамическая генерация целей блоков
# $(1) - Путь-префикс
# $(2) - Путь до блока: blocks/b-block
generate_block_targets=$(foreach block,$(2),$(eval $(call BLOCK_template,$(1),$(call get_block_level,$(block)),$(block),$(call get_file_prefix,$(block)))))

# Динамическая генерация целей для уровней переопределения
# $(1) - Путь-префикс
# $(2) - Путь до уровней блоков: blocks blocks-intranet
generate_block_level_targets=$(foreach level,$(2),$(eval $(call BLOCK_LEVEL_template,$(1),$(level))))

# Динамическая генерация целей для технологий страницы
# $(1) - Путь-префикс
# $(2) - Путь до страницы: pages/page
# $(3) - Префикс файлов страницы: pages/page/page
# $(4) - Перечень технологий: css js xhtml
generate_pagetech_targets=$(foreach tech,$(4),$(eval $(call PAGETECH_template,$(1),$(1)$(call get_page_level,$(call strip_prefix,$(2),$(1))),$(call get_parent,$(2)),$(2),$(3),$(tech))))

# Динамическая генерация целей для страниц
# $(1) - Путь-префикс
# $(2) - Пути до страниц: pages/page1 pages/page2
generate_page_targets=$(foreach page,$(2),$(eval $(call PAGE_template,$(1),$(1)$(call get_page_level,$(call strip_prefix,$(2),$(1))),$(call get_parent,$(2)),$(2),$(call get_file_prefix,$(2)))))

# Динамическая генерация целей для уровней страниц
# $(1) - Путь-префикс
# $(2) - Пути до уровней страниц: pages pages-mobile
generate_page_level_targets=$(foreach pages,$(2),$(eval $(call PAGE_LEVEL_template,$(1),$(pages))))


# ================================ svn-mime-type

.PHONY: svn-mime-type
svn-mime-type::
	$(info ===> Setting svn:mime-type properties)
	find . -name '*.txt' -o -name '*.wiki' -exec svn propset svn:mime-type text/plain {} \;


# ================================ Блоки

# Шаблон для целей одного блока
# $(1) - Путь-префикс
# $(2) - Директория уровня переопределения: blocks
# $(3) - Директория блока: blocks/b-block
# $(4) - Префикс файлов блоков: blocks/b-block/b-block
define BLOCK_template

clean::
	-rm -f $(4).decl.js
ifneq ($(wildcard $(3)/GNUmakefile),)
# Запускаем make clean внутри директории блока, если там есть GNUmakefile
	$$(info ===> Launching make clean in '$(3)')
	-$$(MAKE) -C $(3) clean
endif

.PHONY: $(3)/
$(3)/:: $(3)

# Цель для сборки блока вида blocks*/b-block
.PHONY: $(3)
$(3)::
	$$(info ===> Building block '$(3)')

$(3):: \
	$(3)_make \
	$(3)_examples \
	$(4).decl.js

.PHONY: $(3)_make
$(3)_make::
ifneq ($(wildcard $(3)/GNUmakefile),)
# Запускаем make внутри директории блока, если там есть GNUmakefile
	$$(info ===> Launching make in '$(3)')
	$$(MAKE) -C $(3)
endif

# Алиас цели примеров блока (см. https://jira.yandex-team.ru/browse/LEGO-3914)
.PHONY: $(3)/examples $(3)/examples/
$(3)/examples: $(3)_examples
$(3)/examples/: $(3)_examples

.PHONY: $(3)_examples
$(3)_examples::
ifneq ($(wildcard $(3)/examples),)
# Если на уровнях переопределения примеров нет .bem - создать симлинку на tools/bem
	for i in `find $(3)/examples -type d -name "*.blocks"`; do \
		if [ ! -e $$$$i/.bem/level.js ]; then \
			$(BEM) create level --level $(BEMBL_PREFIX)tools/bem/level.js --force $$$$i; \
		fi \
	done
endif

ifneq ($(wildcard $(3)/examples/GNUmakefile),)
# Запускаем make внутри директории примеров блока, если там есть GNUmakefile
	$$(info ===> Launching make in '$(3)/examples')
	$$(MAKE) -C $(3)/examples

clean::
	-$$(MAKE) -C $(3)/examples clean
endif

# Цель для .decl.js файла блока
$(4).decl.js: FORCE $(filter-out $(3),$(call find_dirs,$(3)))
	$$(info ===> Building block file '$$@')
	cd $(dir $(3)) && $(BEM) create block $(notdir $(3)) -T decl.js --force

# Пользовательские добавки к генерации целей для блоков
ifdef after_BLOCK_template
$(call after_BLOCK_template,$(1),$(2),$(3),$(4))
endif

endef


# ================================ Уровни переопределения

# Шаблон для цели одного уровня переопределения
# $(1) - Путь-префикс
# $(2) - Директория уровня переопределения: blocks
define BLOCK_LEVEL_template

# Алиас цели уровня переопределения (см. https://jira.yandex-team.ru/browse/LEGO-3914)
.PHONY: $(2)/
$(2)/:: $(2)

# Цель для сборки уровня переопределения вида block*
level_$(subst -,_,$(2))=$(shell find $(2) $(blocks_find_args))

.PHONY: $(2)
$(2)::
	$$(info ===> Building level '$(2)')

$(2):: $$(level_$(subst -,_,$(2)))

# Динамическая генерация целей для всех блоков уровня переопределения
$$(call generate_block_targets,$(1),$$(level_$(subst -,_,$(2))))

endef


# ================================ Страницы

# Шаблон для цели одной технологии страницы
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
# $(6) - Технология
define PAGETECH_template

$(call add_suffixes,$(5),$(call tech_suffixes,$(6))):: $(5).deps.js
	$$(info ===> Building page file '$$@')
	BEMHTML_ENV=$(YENV) $(BEM) build -d $(5).deps.js -o $(call build_output,$(4)) -n $(notdir $(5)) \
		-t $(call tech_path,$(6)) \
		$(call levels2opts,$(call page_levels,$(1),$(2),$(3),$(4),$(5),$(6)))
endef


# Шаблон для целей одной страницы
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
# $(3) - Дочерняя директория страницы: pages/page
# $(4) - Директория страницы: pages/page/subpage
# $(5) - Префикс для собираемых файлов страницы: pages/page/subpage/subpage
define PAGE_template

# pages/page зависит от pages/page/*
ifneq ($(2),$(3))
$(3):: FORCE $(4)
endif


clean::
	-rm -f $(5).deps.js
	-rm -f $(call add_suffixes,$(5),$(call pages_suffixes,$(2),$(3),$(4),$(call get_page_source,$(1),$(5))))
ifneq ($(wildcard $(4)/GNUmakefile),)
# Запускаем make clean внутри директории страницы, если там есть Makefile
	$$(info ===> Launching make clean in '$(4)')
	-$(MAKE) -C $(4) clean
endif

# Алиас цели страницы (см. https://jira.yandex-team.ru/browse/LEGO-3914)
.PHONY: $(4)/
$(4)/:: $(4)

$(4)::
	$$(info ===> Building page '$(4)')

ifeq ($(call get_page_source,$(1),$(5)),raw.xml)

$(4):: \
	$(5).convert2xml.xsl \
	$(5).xml \
	$(5).decl.xml \
	$(5).bemdecl.js \
	$(call add_suffixes,$(5),$(call pages_suffixes,$(2),$(3),$(4),$(call get_page_source,$(1),$(5)))) \
	$(wildcard $(4)/blocks) \
	$(4)_make

$(5).decl.xml:: $(5).xml
	$$(info ===> Building page file '$$@')
	xsltproc --xinclude $(BEMBL_PREFIX)tools/raw2decl.xsl $$< > $$@

$(5).bemdecl.js:: $(5).decl.xml
	$$(info ===> Building page file '$$@')
	xsltproc --stringparam output module $(BEMBL_PREFIX)tools/declxml2decljson.xsl $$< > $$@

clean::
	-rm -f $(5).convert2xml.xsl
	-rm -f $(5).decl.xml
	-rm -f $(5).bemdecl.js
	-rm -f $(5).xml

else

$(4):: \
	$(5).bemdecl.js \
	$(call add_suffixes,$(5),$(call pages_suffixes,$(2),$(3),$(4),$(call get_page_source,$(1),$(5)))) \
	$(wildcard $(4)/blocks) \
	$(4)_make

ifeq ($(call get_page_source,$(1),$(5)),bemjson.js)
$(5).bemdecl.js:: $(5).bemjson.js
	$$(info ===> Building page file '$$@')
	$(BEMBL_PREFIX)lib/bemjson2bemdecl.js $$< $$@

clean::
	-rm -f $(5).bemdecl.js
endif

endif

# Сжатие
.PHONY: $(4)_underscore
$(4):: $(4)_underscore
$(4)_underscore:: $(foreach suffix,$(call pages_underscore_suffixes,$(2),$(3),$(4)),$(4)/_$(notdir $(5)).$(suffix))

.PHONY: $(4)_make
$(4)_make::
ifneq ($(wildcard $(4)/GNUmakefile),)
# Запускаем make внутри директории страницы, если там есть Makefile
	$$(info ===> Launching make in '$(4)')
	$(MAKE) -C $(4)
endif

$(5).deps.js:: $(5).bemdecl.js
	$$(info ===> Building page file '$$@')
	$(BEM) build -d $(5).bemdecl.js -o $(call build_output,$(4)) -n $(notdir $(5)) \
		-t $(call tech_path,deps.js) \
		$(call levels2opts,$(call page_levels,$(1),$(2),$(3),$(4),$(5),deps.js))

$(call add_suffixes,$(5),$(call pages_suffixes,$(2),$(3),$(4),$(call get_page_source,$(1),$(5)))):: $(5).deps.js FORCE
	$$(info ===> Building page file '$$@')

# Собирать проектные блоки
ifeq ($(BUILD_PRJ_BLOCK_LEVELS),true)

# Динамическая генерация целей для уровня переопределения для страницы
$$(foreach level,$(wildcard $(4)/blocks),$$(call generate_block_level_targets,$(1),$$(level)))

endif

# Динамическая генерация целей для всех технологий страницы
$$(call generate_pagetech_targets,$(1),$(4),$(5),$$(call pages_techs,$(2),$(3),$(4),$(call get_page_source,$(1),$(5),$(6))))

# Пользовательские добавки к генерации целей для страниц
ifdef after_PAGE_template
$(call after_PAGE_template,$(1),$(2),$(3),$(4),$(5))
endif

endef


# ================================ Типы страниц

# Шаблон для целей одного уровня переопределения
# $(1) - Путь-префикс
# $(2) - Директория уровня страницы: pages
define PAGE_LEVEL_template

# Алиас цели уровня страниц (см. https://jira.yandex-team.ru/browse/LEGO-3914)
.PHONY: $(2)/
$(2)/:: $(2)

# Цель для сборки пачки страниц вида pages*
pages_$(2):=$(call level_pages,$(2))

# Генерация общего бандла для всех страниц уровня
ifeq ($(call get_opt_for_mod,GENERATE_COMMON_BUNDLE,$(2)),true)

common_bundle_dir_$(2)=$(2)/$(call get_opt_for_mod,COMMON_BUNDLE_NAME,$(2))

$$(if $$(wildcard $$(common_bundle_dir_$(2))),,\
$$(error No dir for common bundle '$$(common_bundle_dir_$(2))', \
you must create it yourself, run: mkdir -p $$(common_bundle_dir_$(2))))

common_bundle_$(2)=$$(call get_file_prefix,$$(common_bundle_dir_$(2))).bemdecl.js
common_bundle_deps_$(2)=$$(filter-out $$(common_bundle_$(2)),\
$$(foreach p,$$(pages_$(2)),$$(call get_file_prefix,$$(p)).bemdecl.js))

endif

.PHONY: $(2)
$(2)::
	$$(info ===> Building pages in '$(2)')

$(2):: \
	$(wildcard $(2)/blocks) \
	$$(pages_$(2))

# Генерация общего бандла для всех страниц уровня
ifeq ($(call get_opt_for_mod,GENERATE_COMMON_BUNDLE,$(2)),true)

$(2):: $$(common_bundle_$(2))
$$(common_bundle_$(2)):: $$(common_bundle_deps_$(2))
	@echo -n Generating $$@...
	@$(BEM) decl merge -o $$@ $$(foreach d,$$(common_bundle_deps_$(2)),-d $$d)
	@echo ok

endif

# Динамическая генерация целей для уровня переопределения на уровне страниц
$$(foreach level,$(wildcard $(2)/blocks),$$(call generate_block_level_targets,$(1),$$(level)))

# Динамическая генерация целей для всех страниц группы страниц
$$(foreach page,$$(pages_$(2)),$$(call generate_page_targets,$(1),$$(page)))

# Пользовательские добавки к генерации целей для уровней страниц
ifdef after_PAGE_LEVEL_template
$(call after_PAGE_LEVEL_template,$(1),$(2))
endif

endef


.PHONY: FORCE

# ================================ Суффиксные цели
