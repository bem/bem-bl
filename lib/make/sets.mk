.PHONY: all
all:: ;

# ================================ Includes

ifneq ($(MAKEFILE_LIST),)
__lego_make_root := $(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))

# If there are any spaces in the path in __lego_make_root then give up

ifeq (1,$(words $(__lego_make_root)))
__lego_make_root := $(patsubst %sets.mk,%,$(__lego_make_root))
else
__lego_make_root :=
endif

include $(__lego_make_root)common.mk

else

include common.mk

endif

# ================================ Переменные

YENV ?= development

EXAMPLES ?= $(shell find $(SET_SOURCE) -not -name '*.params.*' \( -wholename '*/examples/*.xml' -o -wholename '*/examples/*.bemjson.js' \) -not \( -name '.svn' -prune \) | sed -e 's~$(SET_SOURCE)/~~;s~.xml$$~~;s~.bemjson.js$$~~')

TECH_PATH = $(1)
TECH_PATH_bemhtml = $(BEMBL_PREFIX)blocks-common/i-bem/bem/techs/bemhtml.js

DOCS ?= $(shell find ../../blocks-common ../../blocks-desktop -mindepth 1 -maxdepth 1 -type d -not -name '.*' | sed -e 's~../../blocks-common/~~' | sed -e 's~../../blocks-desktop/~~' | uniq)

# ================================ Функции

# Динамическая генерация целей для примеров
# $(1) - Путь-префикс
# $(2) - Пути до примеров: blocks/b-blocks/examples/10block_bem blocks/b-blocks/examples/20block_xml
generate_block_examples_targets=$(foreach example,$(2),\
$(eval $(call PAGE_template,$(1)/,$(call get_parent,$(call get_parent,$(example))),$(call get_parent,$(call get_parent,$(example))),$(call get_parent,$(example)),$(example))))

# Динамическая генерация целей для тестов
# $(1) - Путь-префикс
# $(2) - Пути до примеров: blocks/b-blocks/tests/10block_bem blocks/b-blocks/tests/20block_xml
generate_block_tests_targets=$(foreach test,$(2),\
$(eval $(call PAGE_template,$(1)/,$(call get_parent,$(call get_parent,$(test))),$(call get_parent,$(call get_parent,$(test))),$(call get_parent,$(test)),$(test))))

# Динамическая генерация целей для документации блоков
# $(1) - Путь-префикс
# $(2) - Пути до примеров: blocks/b-block1 blocks/b-block2
generate_block_docs_targets=$(foreach doc,$(2),\
$(eval $(call PAGE_template,$(1)/,$(call get_parent,$(doc)),$(call get_parent,$(doc)),$(doc),$(doc)/$(notdir $(doc)))))

# ================================ Сборка примеров

PAGES_TECHS_bemjson.js := $(or $(EXAMPLE_TECHS_bemjson.js),bemhtml css js pub.js)
PAGES_TECHS_bemdecl.js := $(or $(EXAMPLE_TECHS_bemdecl.js),bemhtml css js)

PAGES_SUFFIXES_bemjson.js := $(or $(EXAMPLE_SUFFIXES_bemjson.js),html)
PAGES_SUFFIXES_bemdecl.js := $(or $(EXAMPLE_SUFFIXES_bemdecl.js),html)

PAGE_LEVELS = $(EXAMPLE_LEVELS)

# Дополнительные цели для примеров (все пути предваряются $(LEGO_PREFIX))
# $(1) - Путь-префикс: blocks/
# $(2) - Директория уровня страницы: blocks/b-block
# $(3) - Дочерняя директория страницы: blocks/b-block
# $(4) - Директория страницы: blocks/b-block/examples
# $(5) - Префикс для собираемых файлов страницы: blocks/b-block/examples/example-name
define after_PAGE_template

.PHONY: $(5)
$(5):: \
	$(5).bemdecl.js \
	$(call add_suffixes,$(5),$(call pages_suffixes,$(2),$(3),$(4),$(call get_page_source,$(1),$(5))))

$(5).bemjson.js:: $(1)$(5).bemjson.js
	mkdir -p $$(@D)
	cp -f $$< $$@

$(5).html:: $(5).bemhtml.js $(5).bemjson.js
	#bem create block -T $(BEMBL_PREFIX)blocks-common/i-bem/bem/techs/html.js --force $$(*F)
	$(BEMBL_PREFIX)lib/bemjson2html.js $$^ $$@

$(5).css::
	borschik -t css -i $(5).css -o $(4)/_$(notdir $(5)).css

endef

$(call generate_block_examples_targets,$(SET_SOURCE),$(EXAMPLES))

.PHONY: examples
examples:: $(sort $(foreach example,$(EXAMPLES),$(call get_parent,$(example))))

all:: examples

# ================================ Страницы документации

PAGES_TECHS_bemdecl.js := $(or $(DOC_TECHS_bemdecl.js),)

PAGES_SUFFIXES_bemdecl.js := ru.html en.html

PAGE_LEVELS = $(DOC_LEVELS)

# Дополнительные цели для документации
# $(1) - Путь-префикс: ../../blocks-desktop/
# $(2) - Директория уровня страницы: .
# $(3) - Дочерняя директория страницы: .
# $(4) - Директория страницы: b-block
# $(5) - Префикс для собираемых файлов страницы: b-block/b-block
define after_PAGE_template

$(4):: $(4)/examples

$(5).en.html $(5).ru.html:: \
$(5).en.bemjson.js $(5).ru.bemjson.js $(5).en.bemhtml.js $(5).ru.bemhtml.js \
$(5).en.css $(5).ru.css \
$(5).en.ie.css $(5).ru.ie.css \
$(5).en.js $(5).ru.js
	BEMTECH_locales_techs="`pwd`/../../blocks-common/i-bem/bem/techs/html.js" \
	BEMTECH_locales_locales="`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'`" \
	bem create block -T ../../lib/bem/techs/locales.js --force \
	$(4)

$(5).en.css $(5).ru.css:: $(5).en.deps.js $(5).ru.deps.js
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d `echo $$(@) | perl -pi -e 's#\.css#.deps.js#g'` \
		-t css \
		-n $(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'` \
		-o $(4)
	borschik -t css -i $$(@) -o $(4)/_$(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'`.css

$(5).en.ie.css $(5).ru.ie.css:: $(5).en.deps.js $(5).ru.deps.js
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d `echo $$(@) | perl -pi -e 's#\.ie\.css#.deps.js#g'` \
		-t ie.css \
		-n $(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'` \
		-o $(4)
	borschik -t css -i $$(@) -o $(4)/_$(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'`.ie.css

$(5).en.js $(5).ru.js:: $(5).en.deps.js $(5).ru.deps.js
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d `echo $$(@) | perl -pi -e 's#\.js#.deps.js#g'` \
		-t js \
		-n $(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'` \
		-o $(4)

$(5).en.bemhtml.js $(5).ru.bemhtml.js:: $(5).en.deps.js $(5).ru.deps.js
	bem build -l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d `echo $$(@) | perl -pi -e 's#bemhtml\.js#deps.js#g'` \
		-t ../../blocks-common/i-bem/bem/techs/bemhtml.js \
		-n $(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'` \
		-o $(4)

$(5).en.deps.js $(5).ru.deps.js:: $(5).en.bemdecl.js $(5).ru.bemdecl.js
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d `echo $$(@) | perl -pi -e 's#deps\.js#bemdecl.js#g'` \
		-t deps.js \
		-n $(4).`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'` \
		-o $(4)

$(5).en.bemdecl.js $(5).ru.bemdecl.js:: $(5).en.bemjson.js $(5).ru.bemjson.js
	node ../../lib/bemjson2bemdecl.js `echo $$(@) | perl -pi -e 's#bemdecl\.js#bemjson.js#g'`

$(5).en.bemjson.js $(5).ru.bemjson.js:: $(5).en.doc.js $(5).ru.doc.js
	BEMTECH_locales_techs="`pwd`/../../lib/bem/techs/block-page.js" \
	BEMTECH_locales_locales="`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'`" \
	bem create block -T ../../lib/bem/techs/locales.js --force \
	$(4)

$(5).en.doc.js $(5).ru.doc.js:: $(5).decl.js
	BEMTECH_locales_techs="`pwd`/../../lib/bem/techs/doc.js.js" \
	BEMTECH_locales_locales="`echo $$(@) | perl -pi -e 's#^.*(ru|en).*$$$$#\1#g'`" \
	bem create block -T ../../lib/bem/techs/locales.js \
	--force \
	$(4)

.PHONY: $(5).decl.js
$(5).decl.js:: $(5).bemdecl.js
	bem build -l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $(5).bemdecl.js \
		-t decl.js \
		-n $(4) \
		-o $(4)

.PHONY: $(5).bemdecl.js
$(5).bemdecl.js::
	mkdir -p $$(@D)
	echo "exports.blocks = [ { name: '$(4)' } ];" > $$@

endef

$(call generate_block_docs_targets,$(SET_SOURCE),$(DOCS))

.PHONY: docs
docs:: $(sort $(DOCS))

all:: docs

# ================================ Дополнительные цели

.PHONY: clean
clean::
	-rm -rf i-* b-* l-* g-*

