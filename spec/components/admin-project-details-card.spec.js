describe('AdminProjectDetailsCard', function() {
  var AdminProjectDetailsCard = window.c.AdminProjectDetailsCard;

  describe('controller', function() {
    beforeAll(function(){
      generateController = function(attrs) {
        projectDetail = ProjectDetailsMockery(attrs)[0];
        component = m.component(AdminProjectDetailsCard, {resource: projectDetail});
        return component.controller();
      };
    });

    describe('project status text', function() {
      it('when project is online', function() {
        ctrl = generateController({state: 'online'});
        expect(ctrl.statusTextObj().text).toEqual('NO AR');
        expect(ctrl.statusTextObj().cssClass).toEqual('text-success');
      });

      it('when project is failed', function() {
        ctrl = generateController({state: 'failed'});
        expect(ctrl.statusTextObj().text).toEqual('NÃO FINANCIADO');
        expect(ctrl.statusTextObj().cssClass).toEqual('text-error');
      });
    });

    describe('project remaining time', function() {
      it('when remaining time is in days', function() {
        ctrl = generateController({remaining_time: {total: 10, unit: 'days'}});
        expect(ctrl.remainingTextObj().total).toEqual(10);
        expect(ctrl.remainingTextObj().unit).toEqual('dias');
      });

      it('when remaining time is in seconds', function() {
        ctrl = generateController({remaining_time: {total: 12, unit: 'seconds'}});
        expect(ctrl.remainingTextObj().total).toEqual(12);
        expect(ctrl.remainingTextObj().unit).toEqual('segundos');
      });

      it('when remaining time is in hours', function() {
        ctrl = generateController({remaining_time: {total: 2, unit: 'hours'}});
        expect(ctrl.remainingTextObj().total).toEqual(2);
        expect(ctrl.remainingTextObj().unit).toEqual('horas');
      });
    });
  });

  describe('view', function() {
    beforeAll(function() {
      projectDetail = ProjectDetailsMockery()[0];
      component = m.component(AdminProjectDetailsCard, {resource: projectDetail});
      ctrl = component.controller();
      view = component.view(ctrl, {resource: projectDetail});
      $output = mq(view);
    });

    it('should render details of the project in card', function() {
      var remaningTimeObj = ctrl.remainingTextObj(),
          statusTextObj = ctrl.statusTextObj();

      expect($output.find('.project-details-card').length).toEqual(1);
      expect($output.contains(projectDetail.total_contributions)).toEqual(true);
      expect($output.contains('R$ ' + window.c.h.formatNumber(projectDetail.pledged, 2))).toEqual(true);
      expect($output.contains(projectDetail.progress.toFixed(2) + '%')).toEqual(true);
      expect($output.contains(remaningTimeObj.unit + ' restantes')).toEqual(true);
      expect($output.contains(statusTextObj.text)).toEqual(true);
    });
  });
});



