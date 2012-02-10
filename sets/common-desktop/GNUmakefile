#BEMTECH_locales_tech="`pwd`/../../../lib/bem/techs/full.wiki.js" BEMTECH_locales_locales="ru en" bem build -d i-jquery.bemdecl.js -t ../../../lib/bem/techs/locales.js -l ../../../blocks-common -l ../../../blocks-desktop -n i-jquery

BEM ?= bem

all: blocks

blocks:: $(foreach block,$(wildcard ../../blocks-common/*),$(notdir $(block))/$(notdir $(block)).ru.html $(notdir $(block))/$(notdir $(block)).en.html)
blocks:: $(foreach block,$(wildcard ../../blocks-desktop/*),$(notdir $(block))/$(notdir $(block)).ru.html $(notdir $(block))/$(notdir $(block)).en.html)
	echo $^

.PRECIOUS: %.html
%.html: %.bemhtml.js %.bemjson.js %.ie.css %.css %.js
	rm -f $@
	BEMTECH_locales_techs="`pwd`/../../blocks-common/i-bem/bem/techs/html.js" \
	BEMTECH_locales_locales="`echo $(@F) | perl -pi -e 's#^.*(ru|en).*$$#\1#g'`" \
	bem create block -T ../../lib/bem/techs/locales.js \
	$(*D)

%.bemjson.js: %.doc.js
	rm -f $@
	BEMTECH_locales_techs="`pwd`/../../lib/bem/techs/block-page.js" \
	BEMTECH_locales_locales="`echo $(@F) | perl -pi -e 's#^.*(ru|en).*$$#\1#g'`" \
	bem create block -T ../../lib/bem/techs/locales.js \
	$(*D)

%.doc.js: %.decl.js
	echo 'build doc'
	BEMTECH_locales_techs="`pwd`/../../lib/bem/techs/doc.js.js" \
	BEMTECH_locales_locales="`echo $(@F) | perl -pi -e 's#^.*(ru|en).*$$#\1#g'`" \
	$(BEM) create block -T ../../lib/bem/techs/locales.js \
	--force \
	$(*D)

%.decl.js: %.blockdecl.js
	BEMTECH_locales_tech="decl.js" \
	BEMTECH_locales_locales="`echo $(@F) | perl -pi -e 's#^.*(ru|en).*$$#\1#g'`" \
	bem build -l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.blockdecl.js \
		-t ../../lib/bem/techs/locales.js \
		-n $(*D) \
		-o $(*D)

#%.doc.js: %.blockdecl.js
#	rm -f $@
#	BEMTECH_locales_tech="`pwd`/../../lib/bem/techs/doc.js.js" \
#	BEMTECH_locales_locales="`echo $(@F) | perl -pi -e 's#^.*(ru|en).*$$#\1#g'`" \
#	bem build -l ../../blocks-common \
#		-l ../../blocks-desktop \
#		-d $*.blockdecl.js \
#		-t ../../lib/bem/techs/locales.js \
#		-n $(*D) \
#		-o $(*D)

#%.bemjson.js: %.full.wiki %.title.txt
#	touch $@
#	node ../../lib/wiki2bemjson.js $*.full.wiki $*.bemjson.js block

%.bemhtml.js: %.deps.js
	mkdir -p $(*D)
	touch $@
	bem build -l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d $*.deps.js \
		-t ../../blocks-common/i-bem/bem/techs/bemhtml.js \
		-n $(*F) \
		-o $(@D)

%.deps.js: %.bemdecl.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
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
		-l ../../blocks \
		-d $*.deps.js \
		-t css \
		-n $(*F) \
		-o $(@D)
	borschik -t css -i $@ -o $(@D)/_$(@F)

.PRECIOUS: %.ie.css
%.ie.css: %.css %.deps.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-d $*.deps.js \
		-t ie.css \
		-n $(*F) \
		-o $(@D)
	borschik -t css -i $@ -o $(@D)/_$(@F)

.PRECIOUS: %.js
%.js: %.deps.js
	touch $@
	bem build \
		-l ../../blocks-common \
		-l ../../blocks-desktop \
		-l ../../blocks \
		-d $*.deps.js \
		-t js \
		-n $(*F) \
		-o $(@D)

%.bemdecl.js: %.bemjson.js
	node ../../lib/bemjson2bemdecl.js $*.bemjson.js

.SECONDEXPANSION:
%.full.wiki: %.blockdecl.js
	touch $@
	BEMTECH_locales_tech="`pwd`/../../lib/bem/techs/full.wiki.js" \
	BEMTECH_locales_locales="`echo $(@F) | perl -pi -e 's#^.*(ru|en).*$$#\1#g'`" \
	bem build -d $*.blockdecl.js \
	-t ../../lib/bem/techs/locales.js \
	-l ../../blocks-common -l ../../blocks-desktop \
	-l ../../blocks \
	-n $(*D) \
	-o $(*D)

.SECONDEXPANSION:
%.title.txt: %.blockdecl.js
	# TODO: take the lastest existed title
	touch $@
	if [ -f ../../blocks-common/$@ ]; then cp ../../blocks-common/$@ $@; fi
	if [ -f ../../blocks-desktop/$@ ]; then cp ../../blocks-desktop/$@ $@; fi

%.blockdecl.js:
	mkdir -p $(*D)
	echo 'exports.blocks = [{ name: "$(*D)"}]' > $@

.PHONY: all blocks
