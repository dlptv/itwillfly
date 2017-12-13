docker build -t itwillfly-build .
rm -rf deploy
mkdir deploy
docker run --rm itwillfly-build cat itwillfly.tar.gz > deploy/itwillfly.tar.gz
