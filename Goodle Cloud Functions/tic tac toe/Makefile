# Simple Makefile

.PHONY: run test

default:	run

APP=app.js
SRC=src
MOD=$(SRC)
MODULES=$(MOD)/ttt.js


TMP=/tmp/$(APP)

$(TMP): $(SRC)/$(APP) $(MODULES)
	browserify $(SRC)/$(APP) >$(TMP)

test:   $(SRC)/$(APP) $(MODULES)
	npm test

run:	$(SRC)/$(APP) $(MODULES)
	npm start 5
