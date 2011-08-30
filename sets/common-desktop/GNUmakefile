#BEMTECH_locales_tech="`pwd`/../../../lib/bem/techs/full.wiki.js" BEMTECH_locales_locales="ru en" bem build -d i-jquery.bemdecl.js -t ../../../lib/bem/techs/locales.js -l ../../../blocks-common -l ../../../blocks-desktop -n i-jquery

all: blocks

blocks: $(foreach block,$(wildcard ../../blocks-*/*),$(notdir $(block))/$(notdir $(block)).ru.html $(notdir $(block))/$(notdir $(block)).en.html)
	echo $^

.PRECIOUS: %.html
%.html: %.bemhtml.js %.bemjson.js %.ie.css %.css %.js
	BEMTECH_locales_techs="`pwd`/../../blocks-common/i-bem/bem/techs/html.js" \
	BEMTECH_locales_locales="`echo $(@F) | sed "s/^.*\(ru\|en\).*$$/\1/g"`" \
	bem create block -T ../../lib/bem/techs/locales.js \
	$(*D)

%.bemjson.js: %.full.wiki
	touch $@
	node ../../lib/wiki2html.js $*.full.wiki $*.bemjson.js

%.bemhtml.js: %.deps.js
	mkdir -p $(*D)
	touch $@
	bem build -l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.deps.js \
		-t ../../blocks-common/i-bem/bem/techs/bemhtml.js \
		-n $(*F) \
		-o $(@D)

%.deps.js: %.bemdecl.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.bemdecl.js \
		-t deps.js \
		-n $(*F) \
		-o $(@D)

.PRECIOUS: %.css
%.css: %.deps.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.deps.js \
		-t css \
		-n $(*F) \
		-o $(@D)

.PRECIOUS: %.ie.css
%.ie.css: %.deps.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.deps.js \
		-t ie.css \
		-n $(*F) \
		-o $(@D)

.PRECIOUS: %.js
%.js: %.deps.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.deps.js \
		-t css \
		-n $(*F) \
		-o $(@D)

%.bemdecl.js: %.bemjson.js
	node ../../lib/bemjson2bemdecl.js $*.bemjson.js

.SECONDEXPANSION:
%.full.wiki: %.blockdecl.js
	touch $@
	BEMTECH_locales_tech="`pwd`/../../lib/bem/techs/full.wiki.js" \
	BEMTECH_locales_locales="`echo $(@F) | sed "s/^.*\(ru\|en\).*$$/\1/g"`" \
	bem build -d $*.blockdecl.js \
	-t ../../lib/bem/techs/locales.js \
	-l ../../blocks-common -l ../../blocks-desktop \
	-n $(*D) \
	-o $(*D)

%.blockdecl.js:
	mkdir -p $(*D)
	echo 'exports.blocks = [{ name: "$(*D)"}]' > $@

.PHONY: all blocks
