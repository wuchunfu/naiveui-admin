/**
 * I18n namespace
 *
 * Locales type
 */
declare namespace I18n {
  type LangType = 'en-US' | 'zh-CN';

  type LangOption = {
    label: string;
    key: LangType;
  };

  type FormMsg = {
    required: string;
    invalid: string;
  };

  type I18nRouteKey = 'root' | 'not-found';

  /** The global dropdown key */
  type DropdownKey = 'refresh' | 'closeCurrent' | 'closeOther' | 'closeLeft' | 'closeRight' | 'closeAll';
  
  type Schema = {
    system: {
      title: string;
      updateTitle: string;
      updateContent: string;
      updateConfirm: string;
      updateCancel: string;
    };
    common: {
      action: string;
      add: string;
      addSuccess: string;
      backToHome: string;
      batchDelete: string;
      cancel: string;
      close: string;
      check: string;
      expandColumn: string;
      columnSetting: string;
      config: string;
      confirm: string;
      delete: string;
      deleteSuccess: string;
      confirmDelete: string;
      edit: string;
      warning: string;
      error: string;
      index: string;
      keywordSearch: string;
      logout: string;
      logoutConfirm: string;
      lookForward: string;
      modify: string;
      modifySuccess: string;
      noData: string;
      operate: string;
      pleaseCheckValue: string;
      refresh: string;
      reset: string;
      search: string;
      switch: string;
      tip: string;
      trigger: string;
      update: string;
      updateSuccess: string;
      userCenter: string;
      yesOrNo: {
        yes: string;
        no: string;
      };
    };
    request: {
      logout: string;
      logoutMsg: string;
      logoutWithModal: string;
      logoutWithModalMsg: string;
      refreshToken: string;
      tokenExpired: string;
    };
    theme: {
      themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
      grayscale: string;
      colourWeakness: string;
      layoutMode: { title: string; reverseHorizontalMix: string } & Record<UnionKey.ThemeLayoutMode, string>;
      recommendColor: string;
      recommendColorDesc: string;
      themeColor: {
        title: string;
        followPrimary: string;
      } & Theme.ThemeColor;
      scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
      page: {
        animate: string;
        mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
      };
      fixedHeaderAndTab: string;
      header: {
        height: string;
        breadcrumb: {
          visible: string;
          showIcon: string;
        };
      };
      tab: {
        visible: string;
        cache: string;
        height: string;
        mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
      };
      sider: {
        inverted: string;
        width: string;
        collapsedWidth: string;
        mixWidth: string;
        mixCollapsedWidth: string;
        mixChildMenuWidth: string;
      };
      footer: {
        visible: string;
        fixed: string;
        height: string;
        right: string;
      };
      watermark: {
        visible: string;
        text: string;
      };
      themeDrawerTitle: string;
      pageFunTitle: string;
      configOperation: {
        copyConfig: string;
        copySuccessMsg: string;
        resetConfig: string;
        resetSuccessMsg: string;
      };
    };
    route: {
      login: string;
      403: string;
      404: string;
      500: string;
      'iframe-page': string;
      home: string;
      document: string;
      document_project: string;
      'document_project-link': string;
      document_vue: string;
      document_vite: string;
      document_unocss: string;
      document_naive: string;
      document_antd: string;
      'user-center': string;
      about: string;
      function: string;
      function_tab: string;
      'function_multi-tab': string;
      'function_hide-child': string;
      'function_hide-child_one': string;
      'function_hide-child_two': string;
      'function_hide-child_three': string;
      function_request: string;
      'function_toggle-auth': string;
      'function_super-page': string;
      manage: string;
      manage_user: string;
      'manage_user-detail': string;
      manage_role: string;
      manage_menu: string;
      'multi-menu': string;
      'multi-menu_first': string;
      'multi-menu_first_child': string;
      'multi-menu_second': string;
      'multi-menu_second_child': string;
      'multi-menu_second_child_home': string;
      exception: string;
      exception_403: string;
      exception_404: string;
      exception_500: string;
      plugin: string;
      plugin_copy: string;
      plugin_charts: string;
      plugin_charts_echarts: string;
      plugin_editor: string;
      plugin_editor_quill: string;
      plugin_editor_markdown: string;
      plugin_icon: string;
      plugin_map: string;
      plugin_print: string;
      plugin_swiper: string;
      plugin_video: string;
      plugin_barcode: string;
      plugin_pinyin: string;
      plugin_excel: string;
      plugin_pdf: string;
      plugin_gantt: string;
      plugin_typeit: string;
    },
    page: {
      login: {
        common: {
          accountLogin: string;
          qrcodeLogin: string;
          login: string;
          account: string;
          accountPlaceholder: string,
          accountMessage: string,
          password: string,
          passwordPlaceholder: string,
          passwordMessage: string,
          confirmPassword: string,
          confirmPasswordPlaceholder: string,
          loginSuccess: string;
          
          loginOrRegister: string;
          userNamePlaceholder: string;
          phonePlaceholder: string;
          codePlaceholder: string;
          codeLogin: string;
          confirm: string;
          back: string;
          validateSuccess: string;
          welcomeBack: string;
        };
        pwdLogin: {
          title: string;
          rememberMe: string;
          forgetPassword: string;
          register: string;
          otherAccountLogin: string;
          otherLoginMode: string;
          superAdmin: string;
          admin: string;
          user: string;
        };
        codeLogin: {
          title: string;
          getCode: string;
          reGetCode: string;
          sendCodeSuccess: string;
          imageCodePlaceholder: string;
        };
        register: {
          title: string;
          agreement: string;
          protocol: string;
          policy: string;
        };
        resetPwd: {
          title: string;
        };
        bindWeChat: {
          title: string;
        };
      };
      home: {
        branchDesc: string;
        greeting: string;
        weatherDesc: string;
        projectCount: string;
        todo: string;
        message: string;
        downloadCount: string;
        registerCount: string;
        schedule: string;
        study: string;
        work: string;
        rest: string;
        entertainment: string;
        visitCount: string;
        turnover: string;
        dealCount: string;
        projectNews: {
          title: string;
          moreNews: string;
          desc1: string;
          desc2: string;
          desc3: string;
          desc4: string;
          desc5: string;
        };
        creativity: string;
      };
      manage: {
        common: {
          status: {
            enable: string;
            disable: string;
          };
        };
        role: {
          title: string;
          roleName: string;
          roleCode: string;
          roleStatus: string;
          roleDesc: string;
          form: {
            roleName: string;
            roleCode: string;
            roleStatus: string;
            roleDesc: string;
          };
          addRole: string;
          editRole: string;
          menuAuth: string;
          buttonAuth: string;
        };
        user: {
          title: string;
          userName: string;
          userGender: string;
          nickName: string;
          userPhone: string;
          userEmail: string;
          userStatus: string;
          userRole: string;
          form: {
            userName: string;
            userGender: string;
            nickName: string;
            userPhone: string;
            userEmail: string;
            userStatus: string;
            userRole: string;
          };
          addUser: string;
          editUser: string;
          gender: {
            male: string;
            female: string;
          };
        };
        menu: {
          home: string;
          title: string;
          id: string;
          parentId: string;
          menuType: string;
          menuName: string;
          routeName: string;
          routePath: string;
          pathParam: string;
          layout: string;
          page: string;
          i18nKey: string;
          icon: string;
          localIcon: string;
          iconTypeTitle: string;
          order: string;
          constant: string;
          keepAlive: string;
          href: string;
          hideInMenu: string;
          activeMenu: string;
          multiTab: string;
          fixedIndexInTab: string;
          query: string;
          button: string;
          buttonCode: string;
          buttonDesc: string;
          menuStatus: string;
          form: {
            home: string;
            menuType: string;
            menuName: string;
            routeName: string;
            routePath: string;
            pathParam: string;
            layout: string;
            page: string;
            i18nKey: string;
            icon: string;
            localIcon: string;
            order: string;
            keepAlive: string;
            href: string;
            hideInMenu: string;
            activeMenu: string;
            multiTab: string;
            fixedInTab: string;
            fixedIndexInTab: string;
            queryKey: string;
            queryValue: string;
            button: string;
            buttonCode: string;
            buttonDesc: string;
            menuStatus: string;
          };
          addMenu: string;
          editMenu: string;
          addChildMenu: string;
          type: {
            directory: string;
            menu: string;
          };
          iconType: {
            iconify: string;
            local: string;
          };
        };
      };
    };
    form: {
      required: string;
      userName: FormMsg;
      phone: FormMsg;
      pwd: FormMsg;
      confirmPwd: FormMsg;
      code: FormMsg;
      email: FormMsg;
    };
    dropdown: Record<DropdownKey, string>;
    icon: {
      github: string;
      themeConfig: string;
      themeSchema: string;
      lang: string;
      fullscreen: string;
      fullscreenExit: string;
      reload: string;
      collapse: string;
      expand: string;
      pin: string;
      unpin: string;
    };
    datatable: {
      itemCount: string;
    };
  };

  type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${ K }.${ GetI18nKey<T[K]> }`
      : K
    : never;

  type I18nKey = GetI18nKey<Schema>;

  type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

  interface $T {
    (key: I18nKey): string;

    (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;

    (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;

    (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;

    (key: I18nKey, list: unknown[], plural: number): string;

    (key: I18nKey, list: unknown[], defaultMsg: string): string;

    (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;

    (key: I18nKey, named: Record<string, unknown>, plural: number): string;

    (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
  }
}
