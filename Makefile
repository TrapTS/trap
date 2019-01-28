###################################
version := $(shell git log -1 --pretty=format:"%h")
trap-image := "alfierichou/trap"

build: ## build this app
	@echo "build this app..."
	@npm run tsc
	@echo "done"

git-push-tag:
	@echo "git tag..."
	@make git-tag
	@echo "done"

trap-build:
	@echo "build application..."
	@docker build -f app.dockerfile -t $(trap-image) .
	@echo "done"

trap-tag:
	@echo "docker tag application..."
	@docker tag $(trap-image) $(trap-image):$(version)
	@echo "docker push this tag image..."
	@docker push $(trap-image):$(version)
	@echo "docker push version done"
	@echo "docker push latest image..."
	@docker push $(trap-image):latest
	@echo "docker push latest version done"
	@echo "done"
