include $(TOPDIR)/rules.mk

PKG_NAME:=leigod-acc
PKG_VERSION:=2026.11.02
PKG_RELEASE:=1
PKG_LICENSE:=proprietary

ifeq ($(ARCH),mipsel)
  LEIGOD_ARCH:=mipsel
  LEIGOD_VERSION:=1.2.2.73
  PKG_HASH:=b6252ddf8ff4ff9294220fc43f63948b069d9dc99f9d0551ab856b2a121e5798
endif
ifeq ($(ARCH),aarch64)
  LEIGOD_ARCH:=arm64
  LEIGOD_VERSION:=1.2.2.70
  PKG_HASH:=d067e113303e18110d8c65735870b2b8ff4dcf188c6aa1981012b420b3ea929c
endif
ifeq ($(ARCH),arm)
  LEIGOD_ARCH:=arm
  LEIGOD_VERSION:=1.2.2.72
  PKG_HASH:=a4de021fc3566f3637c8beb1dab80b2f7320f743d3d7cc91e4b7fe0596dec4f9
endif
ifeq ($(ARCH),x86_64)
  LEIGOD_ARCH:=amd64
  LEIGOD_VERSION:=1.2.2.71
  PKG_HASH:=6e9305ffedd3232297e85eb23ec644681e4d98b4b4149f52899ea19e302e4a05
endif

PKG_SOURCE:=acc-bundle-$(LEIGOD_ARCH).tar.gz
PKG_SOURCE_URL:=http://119.3.40.126/router_plugin_new
PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)
include $(INCLUDE_DIR)/package.mk

STRIP:=true
TAR_CMD=$(HOST_TAR) -C $(1)/ $(TAR_OPTIONS)

define Package/leigod-acc
  SECTION:=net
  CATEGORY:=Network
  TITLE:=Leigod game accelerator core
  DEPENDS:=@(aarch64||arm||mipsel||x86_64) +firewall4 +nftables +kmod-nft-tproxy +ip-full +iptables-nft
endef

define Package/leigod-acc/conffiles
/etc/config/leigod-acc
/etc/config/accelerator.ini
endef

define Build/Compile
endef

define Package/leigod-acc/install
	$(INSTALL_DIR) $(1)/usr/sbin/leigod $(1)/etc/config $(1)/etc/init.d
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/acc-gw.router.$(LEIGOD_ARCH) $(1)/usr/sbin/leigod/
	ln -s acc-gw.router.$(LEIGOD_ARCH) $(1)/usr/sbin/leigod/acc-gw.router
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/ipdatacloud_country.xdb $(1)/etc/config/
	$(INSTALL_CONF) ./files/leigod-acc.config $(1)/etc/config/leigod-acc
	$(INSTALL_CONF) ./files/accelerator.ini $(1)/etc/config/accelerator.ini
	$(INSTALL_DATA) ./files/acc_firewall.ini $(1)/etc/config/acc_firewall.ini
	printf '[info]\nversion="$(LEIGOD_VERSION)"\n' > $(1)/etc/config/acc_version.ini
	$(INSTALL_BIN) ./files/leigod-acc.init $(1)/etc/init.d/leigod-acc
endef

$(eval $(call BuildPackage,leigod-acc))
