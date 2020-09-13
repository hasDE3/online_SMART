from django.conf.urls import url
#from rest_framework.urlpatterns import format_suffix_patterns
from smart_main import views
from rest_framework.schemas import get_schema_view
from django.urls import path

schema_view = get_schema_view(title='API Views')

urlpatterns = [
    #url('^schema/$', schema_view),

    # Cause
    path('listca/', views.ca_list.as_view()),
    path('addca/', views.ca_post.as_view()),
    path('updateca/', views.ca_update),
    path('removeca/', views.ca_remove),

    # Effect
    path('listef/', views.ef_list.as_view()),
    path('addef/', views.ef_post.as_view()),
    path('updateef/', views.ef_update),
    path('removeef/', views.ef_remove),

    # CauseControl
    path('listcaco/', views.caco_list.as_view()),
    path('addcaco/', views.caco_post.as_view()),
    path('updatecaco/', views.caco_update),
    path('removecaco/', views.caco_remove),

    # EffectControl
    path('listefco/', views.efco_list.as_view()),
    path('addefco/', views.efco_post.as_view()),
    path('updateefco/', views.efco_update),
    path('removeefco/', views.efco_remove),

    # Report
    path('listre/', views.re_list.as_view()),
    path('addre/', views.re_post.as_view()),
    path('updatere/', views.re_update),
    path('removere/', views.re_remove),

    # Some association deletion
    path('removepncs/', views.pn_cs_remove),

    # Risk Matrix
    path('listrm/', views.rm_list.as_view()),
    path('addrm/', views.rm_post.as_view()),
    path('updaterm/', views.rm_update),
    path('removerm/', views.rm_remove),

    # Process Node <=> Hazard Instance Route
    path('listpnhi/', views.pn_hi_list.as_view()),
    path('addpnhi/', views.pn_hi_post.as_view()),
    path('updatepnhi/', views.pn_hi_update),
    path('removepnhi/', views.pn_hi_remove),

    # Process Node <=> System Function Route
    path('listpnsf/', views.pn_sf_list.as_view()),
    path('addpnsf/', views.pn_sf_post.as_view()),
    path('updatepnsf/', views.pn_sf_update),
    path('removepnsf/', views.pn_sf_remove),

    # Process Edge Route
    path('listpe/', views.pe_list.as_view()),
    path('addpe/', views.pe_post.as_view()),
    path('updatepe/', views.pe_update),
    path('removepe/', views.pe_remove),

    # Process Node Group
    path('listng/', views.ng_list.as_view()),
    path('addng/', views.ng_post.as_view()),
    path('updateng/', views.ng_update),
    path('removeng/', views.ng_remove),

    # Process Node Route
    path('listpn/', views.pn_list.as_view()),
    path('addpn/', views.pn_post.as_view()),
    path('updatepn/', views.pn_update),
    path('removepn/', views.pn_remove),

    # Process System Route
    path('listps/', views.ps_list.as_view()),
    path('addps/', views.ps_post.as_view()),
    path('updateps/', views.ps_update),
    path('removeps/', views.ps_remove),

    # Hazard Instance Route
    path('listhi/', views.hi_list.as_view()),
    path('addhi/', views.hi_post.as_view()),
    path('updatehi/', views.hi_update),
    path('removehi/', views.hi_remove),

    # Hazard Type Route
    path('listht/', views.ht_list.as_view()),
    path('addht/', views.ht_post.as_view()),
    path('updateht/', views.ht_update),
    path('removeht/', views.ht_remove),

    # System Route
    path('listsy/', views.sy_list.as_view()),
    path('addsy/', views.sy_post.as_view()),
    path('updatesy/', views.sy_update),
    path('removesy/', views.sy_remove),

    # System Function Route
    path('listsf/', views.sf_list.as_view()),
    path('addsf/', views.sf_post.as_view()),
    path('updatesf/', views.sf_update),
    path('removesf/', views.sf_remove),

    # Issue Log Route
    path('listil/', views.il_list.as_view()),
    path('addil/', views.il_post.as_view()),
    path('updateil/', views.il_update),
    path('removeil/', views.il_remove),

    # Care Setting Route
    path('listcs/', views.cs_list.as_view()),
    path('addcs/', views.cs_post.as_view()),
    path('updatecs/', views.cs_update),
    path('removecs/', views.cs_remove),

]

#urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'html'])
