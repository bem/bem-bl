all:: html

html: $(patsubst %.wiki,%.html,$(wildcard blocks-desktop/*/*.wiki)) index.ru.html index.en.html

.PRECIOUS: %.html
%.html: %.wiki
	node lib/wiki2html.js $(patsubst %.html,%.wiki,$@) $@

index.%.wiki:
	touch $@
	#find blocks-desktop -name '*.ru.title.txt'    | sort | sed 's#^[^/]*/\([^/]*\)/\(.*\)  \1#g' | uniq | sed 's#^\(.*\)# * ((blocks-desktop/\1/\1.ru.wiki \1))#g' > index.ru.wiki
	find blocks-desktop -name '*.$(*F).title.txt' | sort | sed 's#^[^/]*/\([^/]*\)/\(.*\)$$#\1#g' | uniq | sed 's#^\(.*\)# * ((blocks-desktop/\1/\1.$(*F).html \1))#g' > $@
	#find blocks-desktop -name '*.$(*F).title.txt' | sort | xargs -L1 awk '{if(NR==1)sub(/^\xef\xbb\xbf/,"");print}' | xargs -L1 sed 's#^\(.*\)$#\1\n#g' > $@

.PHONY: all
