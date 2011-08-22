all:: html

html: $(patsubst %.wiki,%.html,$(wildcard blocks-desktop/*/*.wiki)) index.ru.html index.en.html

BEM_BUILD=bem build \
		  -l blocks-common/ \
		  -l blocks-desktop/ \
		  -l blocks/ \
		  -d $< \
		  -t $1 \
		  -o $(@D) \
		  -n $(*F)

.PRECIOUS: %.html
%.html: %.bemhtml.js %.css %.js %.ie.css
	lib/bemjson2html.js $(patsubst %.html,%.bemhtml.js,$@) $(patsubst %.html,%.bemjson.js,$@) $@

%.bemhtml.js: %.deps.js
	$(call BEM_BUILD,blocks-common/i-bem/bem/techs/bemhtml.js)

%.deps.js: %.bemdecl.js
	$(call BEM_BUILD,deps.js)

%.bemdecl.js: %.bemjson.js
	lib/bemjson2bemdecl.js $(patsubst %.bemdecl.js,%.bemjson.js,$@)

.PRECIOUS: %.css
%.css: %.deps.js
	$(call BEM_BUILD,css)

.PRECIOUS: %.ie.css
%.ie.css: %.deps.js
	$(call BEM_BUILD,ie.css)

.PRECIOUS: %.js
%.js: %.deps.js
	$(call BEM_BUILD,js)

%.bemjson.js: %.wiki
	#TODO : bem create block -l blocks-desktop/ -T decl.js b-link
	# Строить файловую структуру и собирать wiki для всего блока b-myblock.full.ru.wiki
	node lib/wiki2html.js $(patsubst %.bemjson.js,%.wiki,$@) $@

index.%.wiki:
	touch $@
	cat $(patsubst index.%,index.desc.%,$@) >> $@
	echo '\n\n' >> $@
	find blocks-desktop -name '*.$(*F).title.txt' | sort | sed 's#^[^/]*/\([^/]*\)/\(.*\)$$#\1#g' | uniq | sed 's#^\(.*\)# * ((blocks-desktop/\1/\1.$(*F).html \1))#g' >> $@

.PHONY: all
