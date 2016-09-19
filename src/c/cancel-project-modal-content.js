/**
 * window.c.cancelProjectModalContent component
 * Render cancel project modal
 *
 */
import m from 'mithril';
import models from '../models';
import postgrest from 'mithril-postgrest';

const cancelProjectModalContent = {
    controller(args) {
        let l = m.prop(false),
            deleteSuccess = m.prop(false),
            checkError = m.prop(false),
            checkConfirmed = m.prop(false),
            check = m.prop('');

        const showNextModal = () => {
            if (check() === 'cancelar-projeto'){
              checkConfirmed(true);
            }
            else{
              checkError(true);
            }
            return false;
        };

        const cancelProject = () => {
            if (check() === 'cancelar-projeto'){
                let loaderOpts = models.cancelProject.postOptions({
                    _project_id: args.project.project_id
                });
                l = postgrest.loaderWithToken(loaderOpts);
                l.load().then(deleteSuccess(true));

            }
            else{
              checkError(true);
            }
            return false;
        };

        return {
            showNextModal: showNextModal,
            cancelProject: cancelProject,
            checkConfirmed: checkConfirmed,
            checkError: checkError,
            deleteSuccess: deleteSuccess,
            check: check
        };
    },
    view(ctrl, args) {
        const project = args.project;
        return (ctrl.checkConfirmed() ?  m(".modal-dialog-content",
                [
                    m(".fontsize-smaller.u-marginbottom-20", 
                        "Conte porque você está cancelando sua campanha. Essa mensagem será enviada por email para os seus apoiadores e estará pública na aba \"Novidades\" do seu projeto no Catarse."
                    ),
                    m(".w-form",
                        [
                            m("form",
                                [
                                    m("img[src='https://daks2k3a4ib2z.cloudfront.net/54b440b85608e3f4389db387/57a424c6e67057bb1c6634d4_Screenshot%202016-08-05%2015.31.45.png']"),
                                    m("textarea.height-small.positive.text-field.w-input[id='field'][maxlength='5000'][name='field'][placeholder='Example Text']")
                                ]
                            ),
                            m(".w-form-done", 
                                m("div", 
                                    "Thank you! Your submission has been received!"
                                )
                            ),
                            m(".w-form-fail", 
                                m("div", 
                                    "Oops! Something went wrong while submitting the form"
                                )
                            )
                        ]
                    ),
                    m("div", 
                        m(".w-row",
                            [
                                m(".w-col.w-col-3"),
                                m(".u-text-center.w-col.w-col-6",
                                    [
                                        m("a.btn.btn-inactive.btn-large.u-marginbottom-20", 
                                            "Cancelar campanha"
                                        ),
                                        m("a.fontsize-small.link-hidden-light[data-ix='hide-modal'][href='#']", 
                                            "Cancelar"
                                        )
                                    ]
                                ),
                                m(".w-col.w-col-3")
                            ]
                        )
                    )
                ]
            ) 
         :
        m('form.modal-dialog-content',{onsubmit: ctrl.showNextModal},
                [
                    m(".fontsize-small.u-marginbottom-20",
                        [
                            "Após o cancelamento, sua campanha constará na plataforma como \"não financiada\" e os seus apoiadores serão imediatamente reembolsados. ",
                            m("span.fontweight-semibold", 
                                "Essa ação não poderá ser desfeita!"
                            ),
                            m("br"),
                            m("span.fontweight-semibold")
                        ]
                    ),
                    m(".fontsize-small.u-marginbottom-10",
                        [
                            "Se você tem certeza que deseja cancelar seu projeto, confirme escrevendo ",
                            m("span.fontweight-semibold.text-error", 
                                "cancelar-projeto "
                            ),
                            "no campo abaixo. Em seguida te pediremos para escrever uma mensagem aos seus apoiadores e seu projeto será então cancelado.",
                            m("span.fontweight-semibold.text-error")
                        ]
                    ),
                    m(".w-form",
                        [
                            m('input.positive.text-field.u-marginbottom-40.w-input[maxlength=\'256\'][type=\'text\']', {class: !ctrl.checkError() ? false : 'error', placeholder: 'cancelar-projeto', onchange: m.withAttr('value', ctrl.check)})
                        ]
                    ),
                    m("div", 
                        m(".w-row",
                            [
                                m(".w-col.w-col-3"),
                                m(".u-text-center.w-col.w-col-6",
                                    [
                                        m("input.btn.btn-inactive.btn-large.u-marginbottom-20[type=\'submit\'][value=\'Próximo passo >\']"),
                                        m("a.fontsize-small.link-hidden-light[href='#']", {onclick: args.displayModal.toggle},
                                            "Cancelar"
                                        )
                                    ]
                                ),
                                m(".w-col.w-col-3")
                            ]
                        )
                    )
                ]));
    }
};

export default cancelProjectModalContent;
