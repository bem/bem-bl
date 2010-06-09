all: up

up:: pull b-up

pull::
		git pull origin master

b-up:: b
		$(MAKE) -C b

b:
		git clone git@github.com:bem/bem-b.git b

.PHONY: all up pull b-up
