all:: sets

sets: $(wildcard sets/*)

sets/%: blocks-common blocks-desktop
	make -C $@ -B

.SECONDEXPANSION:
blocks-%: $$(wildcard $$@/*)
	echo $@

blocks-common/%:
	BEMTECH_locales_techs="`pwd`/lib/bem/techs/full.wiki.js" \
	BEMTECH_locales_locales="ru en" \
	bem create block -T lib/bem/techs/locales.js \
	-l blocks-common $(*F)

blocks-desktop/%:
	BEMTECH_locales_techs="`pwd`/lib/bem/techs/full.wiki.js" \
	BEMTECH_locales_locales="ru en" \
	bem create block -T lib/bem/techs/locales.js \
	-l blocks-desktop $(*F)

.PHONY: all sets
