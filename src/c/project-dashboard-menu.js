window.c.ProjectDashboardMenu = ((m, _, h) => {
  return {
    controller: (args) => {
      let body = document.getElementsByTagName('body')[0],
          editLinksToggle = h.toggleProp(false, true),
          bodyToggleForNav = h.toggleProp('body-project open', 'body-project closed');

      if (!args.project.is_published) {
        editLinksToggle.toggle();
      }

      return {
        body: body,
        editLinksToggle: editLinksToggle,
        bodyToggleForNav: bodyToggleForNav
      };
    },
    view: (ctrl, args) => {
      const project = args.project,
            editRoute = '/projects/' + project.id + '/edit',
            editLinkClass = 'dashboard-nav-link-left ' + (project.is_published ? 'indent' : '');

      ctrl.body.className = ctrl.bodyToggleForNav();

      return m('#project-nav', [
        m('.project-nav-wrapper', [
          m('nav.w-section.dashboard-nav.side', [
            m('a#dashboard_preview_link.w-inline-block.dashboard-project-name[href="' + (project.is_published ? '/' + project.permalink : editRoute + '#preview') + '"]', [
              m('img.thumb-project-dashboard[src="' + (_.isNull(project.large_image) ? '/assets/thumb-project.png' : project.large_image) + '"][width="114"]'),
              m('.fontcolor-negative.lineheight-tight.fontsize-small', project.name)
            ]),
            m('#info-links', [
              m('a#dashboard_home_link.dashboard-nav-link-left[href="' + editRoute + '#home' + '"]', [
                m('span.fa.fa-bar-chart.fa-lg.fa-fw'), ' Minha Campanha'
              ]),
              (project.is_published ? [
                m('a#dashboard_reports_link.dashboard-nav-link-left[href="' + editRoute + '#reports' + '"]', [
                  m('span.fa.fa.fa-table.fa-lg.fa-fw'), ' Relatórios de apoios'
                ]),
                m('a#dashboard_reports_link.dashboard-nav-link-left.u-marginbottom-30[href="' + editRoute + '#posts' + '"]', [
                  m('span.fa.fa-bullhorn.fa-fw.fa-lg'), ' Novidades ', m('span.badge', project.posts_count)
                ])
              ] : '')
            ]),
            m('.edit-project-div', [
              (!project.is_published ? '' : m('button#toggle-edit-menu.dashboard-nav-link-left', {onclick: ctrl.editLinksToggle.toggle}, [
                m('span.fa.fa-pencil.fa-fw.fa-lg'), ' Editar projeto'
              ])),
              (ctrl.editLinksToggle() ? m('#edit-menu-items', [
                m('#dashboard-links', [
                  ((!project.is_published || project.is_admin_role) ? [
                    m('a#basics_link[class="' + editLinkClass + '"][href="' + editRoute + '#basics' + '"]', 'Básico'),
                    m('a#goal_link[class="' + editLinkClass + '"][href="' + editRoute + '#goal' + '"]', 'Meta e prazo'),
                  ] : ''),
                  m('a#description_link[class="' + editLinkClass + '"][href="' + editRoute + '#description' + '"]', 'Descrição'),
                  m('a#video_link[class="' + editLinkClass + '"][href="' + editRoute + '#video' + '"]', 'Vídeo'),
                  m('a#budget_link[class="' + editLinkClass + '"][href="' + editRoute + '#budget' + '"]', 'Orçamento'),
                  m('a#card_link[class="' + editLinkClass + '"][href="' + editRoute + '#card' + '"]', 'Card do projeto'),
                  m('a#dashboard_reward_link[class="' + editLinkClass + '"][href="' + editRoute + '#reward' + '"]', 'Recompensas'),
                  m('a#dashboard_user_about_link[class="' + editLinkClass + '"][href="' + editRoute + '#user_about' + '"]', 'Sobre você'),
                  ((project.is_published || project.state === 'approved') || project.is_admin_role ? [
                    m('a#dashboard_user_settings_link[class="' + editLinkClass + '"][href="' + editRoute + '#user_settings' + '"]', 'Conta'),
                  ] : ''),
                  (!project.is_published ? [
                    m('a#dashboard_preview_link[class="' + editLinkClass + '"][href="' + editRoute + '#preview' + '"]', [
                      m('span.fa.fa-fw.fa-eye.fa-lg'), ' Preview'
                    ]),
                  ] : '')
                ])
              ]) : ''),
              (!project.is_published ? [
                m('.btn-send-draft-fixed', [
                  (project.state === 'draft' ? m('a.btn.btn-medium[href="/projects/' + project.id + '/send_to_analysis"]', 'Enviar') : ''),
                  (project.state === 'approved' ? m('a.btn.btn-medium[href="/projects/' + project.id + '/publish"]', [
                    'Publicar', m.trust('&nbsp;&nbsp;'), m('span.fa.fa-chevron-right')
                  ]) : '')
                ])
              ] : '')
            ]),
          ]),
        ]),
        m('a.btn-dashboard href="js:void(0);"', {onclick: ctrl.bodyToggleForNav.toggle}, [
          m('span.fa.fa-bars.fa-lg')
        ])
      ]);
    }
  };
}(window.m, window._, window.c.h));
