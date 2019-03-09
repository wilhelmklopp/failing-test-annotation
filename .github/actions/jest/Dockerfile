FROM node:10-slim

LABEL com.github.actions.name="Jest"
LABEL com.github.actions.description="Runs jest"
LABEL com.github.actions.icon="code"
LABEL com.github.actions.color="green"

LABEL maintainer="Wilhelm Klopp <wilhelmklopp@github.com>"

COPY lib /lib
ENTRYPOINT ["/action/lib/entrypoint.sh"]