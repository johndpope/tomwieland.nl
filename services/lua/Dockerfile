# Use LuaJIT (Alpine Linux).
  FROM justincormack/luajit2.1

# Install dependencies.
  RUN apk add --update \
      lua5.1-dev \
      unzip \
      zeromq \
      zeromq-dev

# Install LuaRocks.
  # Lua environment variables.
    ENV WITH_LUA /usr/local/
    ENV LUA_LIB /usr/local/lib/lua
    ENV LUA_INCLUDE /usr/include

  # LuaRocks environment variables.
    ENV LUAROCKS_VERSION 2.3.0
    ENV LUAROCKS_INSTALL luarocks-$LUAROCKS_VERSION
    ENV TMP_LOC /tmp/luarocks

  # Download LuaRocks.
    RUN curl -O http://keplerproject.github.io/luarocks/releases/$LUAROCKS_INSTALL.tar.gz

  # Unpack LuaRocks.
    RUN tar xvzf $LUAROCKS_INSTALL.tar.gz && \
        mv $LUAROCKS_INSTALL $TMP_LOC && \
        rm $LUAROCKS_INSTALL.tar.gz

  # Change workingdirectory to the temporary directory.
    WORKDIR $TMP_LOC

  # Configure LuaRocks
    RUN ./configure \
        --with-lua=$WITH_LUA \
        --with-lua-include=$LUA_INCLUDE \
        --with-lua-lib=$LUA_LIB

  # Install LuaRocks
    RUN make build -j
    RUN make install

  # Reset the working directory.
    WORKDIR /

  # Remove the temporary directory.
    RUN rm $TMP_LOC -rf

# Install rocks.
  RUN luarocks install moonscript

# Install ZeroMQbindings.
  RUN luarocks install lua-llthreads2
  RUN luarocks install lzmq

# Install Penlight
  RUN luarocks install penlight

# Prepare the service.
  RUN mkdir -p /opt/service
  ADD . /opt/service/
  WORKDIR /opt/service

# Expose the port.
  EXPOSE 3000

# Start the service.
  CMD sh run.sh
