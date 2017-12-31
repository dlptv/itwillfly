docker build -t itwillfly-build .
rm -rf deploy
mkdir deploy
docker run -v ${PWD}/deploy:/usr/src/deploy --rm itwillfly-build tar czf ../deploy/itwillfly.tar.gz --exclude=itwillfly.tar.gz --exclude .git . 
scp -P 5555 deploy/itwillfly.tar.gz root@dlap.me:itwillfly/itwillfly.tar.gz
ssh root@dlap.me -p 5555 'cd itwillfly && tar xzf itwillfly.tar.gz'
