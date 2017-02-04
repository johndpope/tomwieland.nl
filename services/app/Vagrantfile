# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "rlees85/archlinux64"
  config.vm.network "public_network"

  config.vm.synced_folder "./", "/src", group: "vagrant", mount_options: ["dmode=775,fmode=664"]

  config.vm.provider "virtualbox" do |vb|
    vb.gui = true
    vb.memory = "1024"
  end

  config.vm.provision "shell", inline: <<-SHELL
    pacman -Syu --noconfirm
  SHELL

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    REPO=$HOME/Repositories/linux-configfiles

    # install git.
    sudo pacman -S --noconfirm git

    # Create some directories.
    mkdir -p \
      ~/Documents \
      ~/Games \
      ~/Photos \
      ~/Repositories

    # Clone the configuration files repository.
    git clone https://github.com/Industrial/linux-configfiles.git $REPO

    # Use the development branch.
    cd $REPO
    git checkout develop

    # scripts I use.
    rm -rf $HOME/.bin
    ln -s $REPO/.bin $HOME

    # Make sure these scripts are executable.
    chmod +x $REPO/.bin/*

    # Install software.
    # Ack-Grep
    sudo pacman -S --noconfirm ack
    rm -rf $HOME/.ackrc
    ln -s $REPO/.ackrc $HOME

    # Chromium browser.
    sudo pacman -S --noconfirm chromium

    # Cmus terminal based audio player.
    sudo pacman -S --noconfirm cmus

    # Docker
    # TODO: Implement.

    # Fish
    sudo pacman -S --noconfirm fish
    mkdir -p $HOME/.config
    rm -rf $HOME/.config/fish
    ln -s $REPO/.config/fish $HOME/.config/fish

    # Git
    rm -rf ~/.gitconfig
    ln -s $REPO/.gitconfig $HOME

    # Neovim
    sudo pacman -S --noconfirm neovim python-neovim python2-neovim
    mkdir -p $HOME/.config
    rm -rf $HOME/.config/nvim
    ln -s $REPO/.config/nvim $HOME/.config/nvim
    mkdir -p $HOME/.config/nvim/backup
    mkdir -p $HOME/.config/nvim/temp

    # Node.js
    sudo pacman -S --noconfirm nodejs npm
    mkdir -p $HOM/npm/bin
    rm -rf $HOME/.npmrc
    ln -s $REPO/.npmrc $HOME

    # Tmux
    sudo pacman -S --noconfirm tmux
    rm -rf $HOME/.tmux
    ln -s $REPO/.tmux $HOME
    rm -rf $HOME/.tmux.conf
    ln -s $REPO/.tmux.conf $HOME

    # Weechat
    sudo pacman -S --noconfirm weechat

    # Xmonad
    sudo pacman -S --noconfirm xmonad
    rm -rf $HOME/.xmonad
    ln -s $REPO/.xmonad $HOME

    # Xorg
    sudo pacman -S --noconfirm xorg xorg-xinit xterm
    rm -rf $HOME/.Xmodmap
    ln -s $REPO/.Xmodmap $HOME
    rm -rf $HOME/.xinitrc
    ln -s $REPO/.xinitrc $HOME

    # Finalization
    sudo chsh -s /usr/bin/fish vagrant
  SHELL
end
