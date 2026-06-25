BUILD_DIR := build/default
SRC_DIR := src
JOB_NAME := default
MAIN_TEX := $(SRC_DIR)/$(JOB_NAME).tex
PDF := $(BUILD_DIR)/$(JOB_NAME).pdf
SCREENSHOT_SCRIPT := scripts/capture_report_screenshots.mjs
SCREENSHOT_BASE_URL ?= https://tpf-projekt-portfolio.polished-wave-a33b.workers.dev/
NODE ?= node

.PHONY: all clean screenshots

all: $(PDF)

$(PDF): $(SRC_DIR)/_preamble.tex $(SRC_DIR)/index.tex $(SRC_DIR)/_postamble.tex
	@mkdir -p $(BUILD_DIR)
	@cat $^ > $(MAIN_TEX)
	@if command -v tectonic >/dev/null 2>&1; then \
		cd $(SRC_DIR) && tectonic -X compile $(JOB_NAME).tex --outdir ../$(BUILD_DIR); \
	elif command -v latexmk >/dev/null 2>&1; then \
		cd $(SRC_DIR) && latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=../$(BUILD_DIR) $(JOB_NAME).tex; \
	else \
		rm -f $(MAIN_TEX); \
		echo "No LaTeX compiler found. Install tectonic or latexmk with xelatex."; \
		exit 1; \
	fi
	@rm -f $(MAIN_TEX)

clean:
	@rm -rf $(BUILD_DIR) $(MAIN_TEX)

screenshots: $(SCREENSHOT_SCRIPT)
	@REPORT_SCREENSHOT_BASE_URL="$(SCREENSHOT_BASE_URL)" $(NODE) $(SCREENSHOT_SCRIPT)
