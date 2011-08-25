all:: html

html: $(shell ls -d blocks-*/*)

blocks-desktop/% blocks-common/%:
	BEMTECH_locales_techs="`pwd`/lib/bem/techs/full.wiki.js" BEMTECH_locales_locales="ru en" bem create block -T lib/bem/techs/locales.js -l blocks-desktop $(*F)
	node lib/wiki2html.js $@/$(*F).en.full.wiki $@/$(*F).en.bemjson.js
	node lib/wiki2html.js $@/$(*F).ru.full.wiki $@/$(*F).ru.bemjson.js
	node lib/bemjson2bemdecl.js $@/$(*F).ru.bemjson.js
	node lib/bemjson2bemdecl.js $@/$(*F).en.bemjson.js
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).ru.bemdecl.js \
			  -t deps.js \
			  -n $(*F).ru \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).en.bemdecl.js \
			  -t deps.js \
			  -n $(*F).en \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).ru.deps.js \
			  -t js \
			  -n $(*F).ru \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).en.deps.js \
			  -t js \
			  -n $(*F).en \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).ru.deps.js \
			  -t css \
			  -n $(*F).ru \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).en.deps.js \
			  -t css \
			  -n $(*F).en \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).ru.deps.js \
			  -t ie.css \
			  -n $(*F).ru \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).en.deps.js \
			  -t ie.css \
			  -n $(*F).en \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).ru.deps.js \
			  -t blocks-common/i-bem/bem/techs/bemhtml.js \
			  -n $(*F).ru \
			  -o $@
	bem build -l blocks-common \
			  -l blocks-desktop \
			  -l blocks \
			  -d $@/$(*F).en.deps.js \
			  -t blocks-common/i-bem/bem/techs/bemhtml.js \
			  -n $(*F).en \
			  -o $@
	lib/bemjson2html.js $@/$(*F).ru.bemhtml.js $@/$(*F).ru.bemjson.js $@/$(*F).ru.html
	lib/bemjson2html.js $@/$(*F).en.bemhtml.js $@/$(*F).en.bemjson.js $@/$(*F).en.html
	rm -f $@/$(*F).*.deps.js $@/$(*F).*.bemdecl.js $@/$(*F).*.bemjson.js $@/$(*F).*.bemhtml.js $@/$(*F).*.full.wiki

.PHONY: all

#all:: html
#
#html: $(patsubst %.wiki,%.html,$(wildcard blocks-desktop/*/*.wiki)) index.ru.html index.en.html
#
#BEM_BUILD=bem build \
#		  -l blocks-common/ \
#		  -l blocks-desktop/ \
#		  -l blocks/ \
#		  -d $< \
#		  -t $1 \
#		  -o $(@D) \
#		  -n $(*F)
#
#.PRECIOUS: %.html
#%.html: %.bemhtml.js %.css %.js %.ie.css
#	lib/bemjson2html.js $(patsubst %.html,%.bemhtml.js,$@) $(patsubst %.html,%.bemjson.js,$@) $@
#
#%.bemhtml.js: %.deps.js
#	$(call BEM_BUILD,blocks-common/i-bem/bem/techs/bemhtml.js)
#
#%.deps.js: %.bemdecl.js
#	$(call BEM_BUILD,deps.js)
#
#%.bemdecl.js: %.bemjson.js
#	lib/bemjson2bemdecl.js $(patsubst %.bemdecl.js,%.bemjson.js,$@)
#
#.PRECIOUS: %.css
#%.css: %.deps.js
#	$(call BEM_BUILD,css)
#
#.PRECIOUS: %.ie.css
#%.ie.css: %.deps.js
#	$(call BEM_BUILD,ie.css)
#
#.PRECIOUS: %.js
#%.js: %.deps.js
#	$(call BEM_BUILD,js)
#
#index.%.wiki:
#	touch $@
#	cat $(patsubst index.%,index.desc.%,$@) >> $@
#	echo '\n\n' >> $@
#	find blocks-desktop -name '*.$(*F).title.txt' | sort | sed 's#^[^/]*/\([^/]*\)/\(.*\)$$#\1#g' | uniq | sed 's#^\(.*\)# * ((blocks-desktop/\1/\1.$(*F).html \1))#g' >> $@
#
#.PHONY: all
