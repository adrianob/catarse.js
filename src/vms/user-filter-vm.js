import m from 'mithril';
import replaceDiacritics from 'replaceDiacritics';
import {catarse} from '../api';

const vm = catarse.filtersVM({
        full_text_index: '@@',
        deactivated_at: 'is.null'
    }),

    paramToString = function (p) {
        return (p || '').toString().trim();
    };

// Set default values
vm.deactivated_at(null).order({
    id: 'desc'
});

vm.deactivated_at.toFilter = function () {
    const filter = JSON.parse(vm.deactivated_at());
    return filter;
};

vm.full_text_index.toFilter = function () {
    const filter = paramToString(vm.full_text_index());
    return filter && replaceDiacritics(filter) || undefined;
};

export default vm;
