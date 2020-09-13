from rest_framework import generics, status, viewsets
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from smart_main.models import CareSetting, IssueLog, SystemModel, SystemFunction, HazardType, HazardInstance, ProcessSystem, ProcessNode, ProcessEdge, ProcessNode_SystemFunction, ProcessNode_HazardInstance, RiskMatrix, Report, NodeGroup, Cause, Effect, CauseControl, EffectControl
from smart_main.serializers import CareSettingSerializer, IssueLogSerializer, SystemSerializer, SystemFunctionSerializer, HazardTypeSerializer, HazardInstanceSerializer, ProcessSystemSerializer, ProcessNodeSerializer, ProcessEdgeSerializer, ProcessNode_SystemFunctionSerializer, ProcessNode_HazardInstanceSerializer, RiskMatrixSerializer, ReportSerializer, NodeGroupSerializer, CauseSerializer, EffectSerializer, CauseControlSerializer, EffectControlSerializer
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view

#from django.views.decorators.csrf import csrf_exempt
#from braces.views import CsrfExemptMixin

# Pagnation

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'pageSize'
    page_query_param = 'current'
    max_page_size = 20



# CAUSE
class ca_list_response(ListAPIView):
    def list(self, request):
        queryset = Cause.objects.all()

        response = {
            'data': []
        }

        ca_filter = self.request.query_params.get('ca_hi', None)

        if ca_filter is not None:
            queryset = queryset.filter(ca_hi=ca_filter)

        serializer = CauseSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class ca_list(ca_list_response):
    serializer_class = CauseSerializer
    queryset = Cause.objects.all()

# Create New
class ca_post(generics.CreateAPIView):
    queryset = Cause.objects.all()
    serializer_class = CauseSerializer

# Update
@api_view(['PATCH'])
def ca_update(request):
    id = request.data['id']
    try:
        selected_ca = Cause.objects.get(id=id)
    except Cause.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = CauseSerializer(selected_ca, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def ca_remove(request):
    ca_id = request.GET.get('pk')
    try:
        if (ca_id):
            selected_ca = Cause.objects.get(id=ca_id)
    except Cause.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_ca.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# EFFECT
class ef_list_response(ListAPIView):
    def list(self, request):
        queryset = Effect.objects.all()

        response = {
            'data': []
        }

        ef_filter = self.request.query_params.get('ef_hi', None)

        if ef_filter is not None:
            queryset = queryset.filter(ef_hi=ef_filter)

        serializer = EffectSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class ef_list(ef_list_response):
    serializer_class = EffectSerializer
    queryset = Effect.objects.all()

# Create New
class ef_post(generics.CreateAPIView):
    queryset = Effect.objects.all()
    serializer_class = EffectSerializer

# Update
@api_view(['PATCH'])
def ef_update(request):
    id = request.data['id']
    try:
        selected_ef = Effect.objects.get(id=id)
    except Effect.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = EffectSerializer(selected_ef, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def ef_remove(request):
    ef_id = request.GET.get('pk')
    try:
        if (ef_id):
            selected_ef = Effect.objects.get(id=ef_id)
    except Effect.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_ef.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# CAUSE CONTROL
class caco_list_response(ListAPIView):
    def list(self, request):
        queryset = CauseControl.objects.all()

        response = {
            'data': []
        }

        ca_filter = self.request.query_params.get('caco_ef', None)

        if ca_filter is not None:
            queryset = queryset.filter(caco_ca=ca_filter)

        serializer = CauseControlSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class caco_list(caco_list_response):
    serializer_class = CauseControlSerializer
    queryset = CauseControl.objects.all()

# Create New
class caco_post(generics.CreateAPIView):
    queryset = CauseControl.objects.all()
    serializer_class = CauseControlSerializer

# Update
@api_view(['PATCH'])
def caco_update(request):
    id = request.data['id']
    try:
        selected_caco = CauseControl.objects.get(id=id)
    except CauseControl.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = CauseControlSerializer(selected_caco, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def caco_remove(request):
    caco_id = request.GET.get('pk')
    try:
        if (caco_id):
            selected_caco = CauseControl.objects.get(id=caco_id)
    except CauseControl.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_caco.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# EFFECT CONTROL
# List
class efco_list_response(ListAPIView):
    def list(self, request):
        queryset = EffectControl.objects.all()

        response = {
            'data': []
        }

        ef_filter = self.request.query_params.get('efco_ef', None)

        if ef_filter is not None:
            queryset = queryset.filter(efco_ef=ef_filter)

        serializer = EffectControlSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class efco_list(efco_list_response):
    serializer_class = EffectControlSerializer
    queryset = EffectControl.objects.all()

# Create New
class efco_post(generics.CreateAPIView):
    queryset = EffectControl.objects.all()
    serializer_class = EffectControlSerializer

# Update
@api_view(['PATCH'])
def efco_update(request):
    id = request.data['id']
    try:
        selected_efco = EffectControl.objects.get(id=id)
    except EffectControl.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = EffectControlSerializer(selected_efco, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def efco_remove(request):
    efco_id = request.GET.get('pk')
    try:
        if (efco_id):
            selected_efco = EffectControl.objects.get(id=efco_id)
    except EffectControl.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_efco.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# REPORT
# List
class re_list_response(ListAPIView):
    def list(self, request):
        queryset = Report.objects.all()

        response = {
            'data': []
        }

        serializer = ReportSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class re_list(re_list_response):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

# Create New
class re_post(generics.CreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

# Update
@api_view(['PATCH'])
def re_update(request):
    id = request.data['id']
    try:
        selected_re = Report.objects.get(id=id)
    except Report.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = ReportSerializer(selected_re, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def re_remove(request):
    re_id = request.GET.get('pk')
    try:
        if (re_id):
            selected_re = Report.objects.get(id=re_id)
    except Report.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_re.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# RISK MATRIX
###############################################################
# List
class rm_list_response(ListAPIView):
    def list(self, request):
        queryset = RiskMatrix.objects.all()

        response = {
            'data': []
        }

        user_filter = self.request.query_params.get('user', None)

        if user_filter is not None:
            queryset = queryset.filter(user=user_filter)

        serializer = RiskMatrixSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class rm_list(rm_list_response):
    serializer_class = RiskMatrixSerializer
    queryset = RiskMatrix.objects.all()

# Create New
class rm_post(generics.CreateAPIView):
    queryset = RiskMatrix.objects.all()
    serializer_class = RiskMatrixSerializer

# Update
@api_view(['PATCH'])
def rm_update(request):
    id = request.data['id']
    try:
        selected_rm = RiskMatrix.objects.get(id=id)
    except RiskMatrix.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = RiskMatrixSerializer(selected_rm, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def rm_remove(request):
    rm_id = request.GET.get('id')
    try:
        if (rm_id):
            selected_rm = RiskMatrix.objects.get(id=rm_id)
    except RiskMatrix.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_rm.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# PROCESS NODE _ HAZARD INSTANCE
###############################################################
# List
class pn_hi_list_response(ListAPIView):
    def list(self, request):
        queryset = ProcessNode_HazardInstance.objects.all()

        response = {
            'data': []
        }

        pn_filter = self.request.query_params.get('pn', None)
        hi_filter = self.request.query_params.get('hi', None)

        if pn_filter is not None:
            queryset = queryset.filter(pn=pn_filter)
        if hi_filter is not None:
            queryset = queryset.filter(hi=hi_filter)

        serializer = ProcessNode_HazardInstanceSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class pn_hi_list(pn_hi_list_response):
    serializer_class = ProcessNode_HazardInstanceSerializer
    queryset = ProcessNode_HazardInstance.objects.all()

# Create New
class pn_hi_post(generics.CreateAPIView):
    queryset = ProcessNode_HazardInstance.objects.all()
    serializer_class = ProcessNode_HazardInstanceSerializer

# Update
@api_view(['PATCH'])
def pn_hi_update(request):
    id = request.data['id']
    try:
        selected_pn_hi = ProcessNode_HazardInstance.objects.get(id=id)
    except ProcessNode_HazardInstance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = ProcessNode_HazardInstanceSerializer(selected_pn_hi, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def pn_hi_remove(request):
    pn_hi_id = request.GET.get('id')
    try:
        if (pn_hi_id):
            selected_pn_hi = ProcessNode_HazardInstance.objects.get(id=pn_hi_id)
    except ProcessNode_HazardInstance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_pn_hi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


###############################################################
# PROCESS NODE _ SYSTEM FUNCTION
###############################################################
# List
class pn_sf_list_response(ListAPIView):
    def list(self, request):
        queryset = ProcessNode_SystemFunction.objects.all()

        response = {
            'data': []
        }

        pn_filter = self.request.query_params.get('pn', None)
        sf_filter = self.request.query_params.get('sf', None)

        if pn_filter is not None:
            queryset = queryset.filter(pn=pn_filter)
        if sf_filter is not None:
            queryset = queryset.filter(sf=sf_filter)

        serializer = ProcessNode_SystemFunctionSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class pn_sf_list(pn_sf_list_response):
    serializer_class = ProcessNode_SystemFunctionSerializer
    queryset = ProcessNode_SystemFunction.objects.all()

# Create New
class pn_sf_post(generics.CreateAPIView):
    queryset = ProcessNode_SystemFunction.objects.all()
    serializer_class = ProcessNode_SystemFunctionSerializer

# Update
@api_view(['PATCH'])
def pn_sf_update(request):
    id = request.data['id']
    try:
        selected_pn_sf = ProcessNode_SystemFunction.objects.get(id=id)
    except ProcessNode_SystemFunction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = ProcessNode_SystemFunctionSerializer(selected_pn_sf, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def pn_sf_remove(request):
    pn_sf_id = request.GET.get('id')
    try:
        if (pn_sf_id):
            selected_pn_sf = ProcessNode_SystemFunction.objects.get(id=pn_sf_id)
    except ProcessNode_SystemFunction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_pn_sf.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


###############################################################
# PROCESS EDGE
###############################################################
# List
class pe_list_response(ListAPIView):
    def list(self, request):
        queryset = ProcessEdge.objects.all()

        response = {
            'data': []
        }

        pe_pk_filter = self.request.query_params.get('id', None)
        pe_ps_filter = self.request.query_params.get('pe_ps', None)

        if pe_ps_filter is not None:
            queryset = queryset.filter(pe_ps=pe_ps_filter)
        if pe_pk_filter is not None:
            queryset = queryset.filter(id=pe_pk_filter)

        serializer = ProcessEdgeSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class pe_list(pe_list_response):
    serializer_class = ProcessEdgeSerializer
    queryset = ProcessEdge.objects.all()

# Create New
class pe_post(generics.CreateAPIView):
    queryset = ProcessEdge.objects.all()
    serializer_class = ProcessEdgeSerializer

# Update
@api_view(['PATCH'])
def pe_update(request):
    id = request.data['id']
    try:
        selected_pe = ProcessEdge.objects.get(id=id)
    except ProcessEdge.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = ProcessEdgeSerializer(selected_pe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def pe_remove(request):
    target_id = request.GET.get('target')
    source_id = request.GET.get('source')
    pe_id = request.GET.get('id')
    try:
        if (target_id):
            selected_pe = ProcessEdge.objects.get(target=target_id)
        if (source_id):
            selected_pe = ProcessEdge.objects.get(source=source_id)
        if (pe_id):
            selected_pe = ProcessEdge.objects.get(id=pe_id)
    except ProcessEdge.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_pe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###############################################################
# PROCESS NODE
###############################################################
# List
class pn_list_response(ListAPIView):
    def list(self, request):
        queryset = ProcessNode.objects.all()

        response = {
            'data': []
        }

        pn_pk_filter = self.request.query_params.get('pk', None)
        pn_ps_filter = self.request.query_params.get('pn_ps', None)
        if pn_pk_filter is not None:
            queryset = queryset.filter(id=pn_pk_filter)
        if pn_ps_filter is not None:
            queryset = queryset.filter(pn_ps=pn_ps_filter)

        serializer = ProcessNodeSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class pn_list(pn_list_response):
    serializer_class = ProcessNodeSerializer
    queryset = ProcessNode.objects.all()

# Create New
class pn_post(generics.CreateAPIView):
    queryset = ProcessNode.objects.all()
    serializer_class = ProcessNodeSerializer

# Update
@api_view(['PATCH'])
def pn_update(request):
    id = request.data['id']
    try:
        selected_pn = ProcessNode.objects.get(id=id)
    except ProcessNode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = ProcessNodeSerializer(selected_pn, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def pn_remove(request):
    id = request.GET.get('id')
    try:
        selected_pn = ProcessNode.objects.get(id=id)
    except ProcessNode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_pn.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Care Setting Related Remove
# When deleting a Care Setting,
# search for associated Process Node and clear the 'pn_cs' field
@api_view(['PATCH'])
def pn_cs_remove(request):
    id = request.data['pn_cs']
    try:
        selected_pn = ProcessNode.objects.filter(pn_cs=id).update(pn_cs="all")
    except ProcessNode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(request.data)

###############################################################
# NODE GROUP
###############################################################
# List
class ng_list_response(ListAPIView):
    def list(self, request):
        queryset = NodeGroup.objects.all()

        response = {
            'data': []
        }

        ng_pk_filter = self.request.query_params.get('pk', None)
        ng_ps_filter = self.request.query_params.get('ng_ps', None)

        if ng_pk_filter is not None:
            queryset = queryset.filter(id=ng_pk_filter)

        if ng_ps_filter is not None:
            queryset = queryset.filter(ng_ps=ng_ps_filter)

        serializer = NodeGroupSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class ng_list(ng_list_response):
    serializer_class = NodeGroupSerializer
    queryset = NodeGroup.objects.all()

# Create New
class ng_post(generics.CreateAPIView):
    queryset = NodeGroup.objects.all()
    serializer_class = NodeGroupSerializer

# Update
@api_view(['PATCH'])
def ng_update(request):
    id = request.data['id']
    try:
        selected_ng = NodeGroup.objects.get(id=id)
    except NodeGroup.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = NodeGroupSerializer(selected_ng, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def ng_remove(request):
    id = request.GET.get('id')
    try:
        selected_ng = NodeGroup.objects.get(id=id)
    except NodeGroup.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_ng.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###############################################################
# PROCESS SYSTEM
###############################################################
# List
class ps_list_response(ListAPIView):
    def list(self, request):
        queryset = ProcessSystem.objects.all()

        response = {
            'data': []
        }

        ps_pk_filter = self.request.query_params.get('pk', None)
        if ps_pk_filter is not None:
            queryset = queryset.filter(id=ps_pk_filter)

        serializer = ProcessSystemSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class ps_list(ps_list_response):
    serializer_class = ProcessSystemSerializer
    queryset = ProcessSystem.objects.all()

# Create New
class ps_post(generics.CreateAPIView):
    queryset = ProcessSystem.objects.all()
    serializer_class = ProcessSystemSerializer

# Update
@api_view(['PATCH'])
def ps_update(request):
    id = request.data['id']
    try:
        selected_ps = ProcessSystem.objects.get(id=id)
    except ProcessSystem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PATCH':
        serializer = ProcessSystemSerializer(selected_ps, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def ps_remove(request):
    id = request.GET.get('pk')
    try:
        selected_ps = ProcessSystem.objects.get(id=id)
    except ProcessSystem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'DELETE':
        selected_ps.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['DELETE'])
# def sy_remove(request):
#     # first get the 'id' from the URL data
#     id = request.GET.get('id')
#     try:
#         selected_sy = SystemModel.objects.get(id=id)
#     except SystemModel.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     related_sf = SystemFunction.objects.filter(sf_parent=id)
#     if related_sf.exists():
#         return Response(status=status.HTTP_404_NOT_FOUND)
#     # delete the request item in the database
#     if request.method == 'DELETE':
#         selected_sy.delete()

#         return Response(status=status.HTTP_204_NO_CONTENT)

###############################################################
# HAZARD INSTANCE
###############################################################

# List
class hi_list_response(ListAPIView):
    def list(self, request):
        queryset = HazardInstance.objects.all()

        response = {
            'data': []
        }

        hi_pk_filter = self.request.query_params.get('pk', None)
        hi_parent_filter = self.request.query_params.get('hi_parent', None)
        if hi_pk_filter is not None:
            queryset = queryset.filter(id=hi_pk_filter)
        if hi_parent_filter is not None:
            queryset = queryset.filter(hi_parent=hi_parent_filter)

        serializer = HazardInstanceSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class hi_list(hi_list_response):
    serializer_class = HazardInstanceSerializer
    queryset = HazardInstance.objects.all()

# Create New
class hi_post(generics.CreateAPIView):
    queryset = HazardInstance.objects.all()
    serializer_class = HazardInstanceSerializer

# Update
@api_view(['PATCH'])
def hi_update(request):
    # first get the 'id' from the JSON data
    id = request.data['pk']
    try:
        selected_hi = HazardInstance.objects.get(id=id)
    except HazardInstance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Response to the PATCH request and update the database
    if request.method == 'PATCH':
        serializer = HazardInstanceSerializer(selected_hi, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def hi_remove(request):
    # first get the 'id' from the URL data
    id = request.GET.get('pk')
    try:
        selected_hi = HazardInstance.objects.get(id=id)
    except HazardInstance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # delete the request item in the database
    if request.method == 'DELETE':
        selected_hi.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###############################################################
# HAZARD TYPE
###############################################################

# List
class ht_list_response(ListAPIView):
    def list(self, request):
        queryset = HazardType.objects.all()

        response = {
            'data': []
        }

        ht_filter = self.request.query_params.get('pk', None)
        if ht_filter is not None:
            queryset = queryset.filter(id=ht_filter)

        serializer = HazardTypeSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class ht_list(ht_list_response):
    serializer_class = HazardTypeSerializer
    queryset = HazardType.objects.all()

# Create New
class ht_post(generics.CreateAPIView):
    queryset = HazardType.objects.all()
    serializer_class = HazardTypeSerializer

# Update
@api_view(['PATCH'])
def ht_update(request):
    # first get the 'id' from the JSON data
    id = request.data['id']
    try:
        selected_ht = HazardType.objects.get(id=id)
    except HazardType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Response to the PATCH request and update the database
    if request.method == 'PATCH':
        serializer = HazardTypeSerializer(selected_ht, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove
@api_view(['DELETE'])
def ht_remove(request):
    # first get the 'id' from the URL data
    id = request.GET.get('pk')
    try:
        selected_ht = HazardType.objects.get(id=id)
    except HazardType.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    related_hi = HazardInstance.objects.filter(hi_parent=id)
    if related_hi.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    # delete the request item in the database
    if request.method == 'DELETE':
        selected_ht.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###############################################################
# SYSTEM FUNCTION
###############################################################

# List
class sf_list_response(ListAPIView):
    def list(self, request):
        queryset = SystemFunction.objects.all()

        response = {
            'data': []
        }

        sf_parent_filter = self.request.query_params.get('sf_parent', None)
        if sf_parent_filter is not None:
            queryset = queryset.filter(sf_parent=sf_parent_filter)

        serializer = SystemFunctionSerializer(queryset, many=True)
        response['data'] = serializer.data

        return Response(response)

class sf_list(sf_list_response):
    serializer_class = SystemFunctionSerializer
    queryset = SystemFunction.objects.all()

# Create New
class sf_post(generics.CreateAPIView):
    queryset = SystemFunction.objects.all()
    serializer_class = SystemFunctionSerializer

# Update
@api_view(['PATCH'])
def sf_update(request):
    # first get the 'id' from the JSON data
    id = request.data['id']
    try:
        selected_sf = SystemFunction.objects.get(id=id)
    except SystemFunction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Response to the PATCH request and update the database
    if request.method == 'PATCH':
        serializer = SystemFunctionSerializer(selected_sf, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def sf_remove(request):
    # first get the 'id' from the URL data
    id = request.GET.get('id')
    try:
        selected_sf = SystemFunction.objects.get(id=id)
    except SystemFunction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # delete the request item in the database
    if request.method == 'DELETE':
        selected_sf.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

###############################################################
# SYSTEM
###############################################################
# List
class sy_list_response(ListAPIView):
    # Use the customized response data type to work with Ant Design Pro
    def list(self, request):
        queryset = SystemModel.objects.all()

        response = {
            'data': []
        }

        sy_id_filter = self.request.query_params.get('pk', None)
        if sy_id_filter is not None:
            queryset = queryset.filter(pk=sy_id_filter)

        serializer = SystemSerializer(queryset, many=True)
        response['data'] = serializer.data
        #response['total'] = len(serializer.data)

        return Response(response)

class sy_list(sy_list_response):
    serializer_class = SystemSerializer
    queryset = SystemModel.objects.all()

# Add New
class sy_post(generics.CreateAPIView):
    queryset = SystemModel.objects.all()
    serializer_class = SystemSerializer

# Update
@api_view(['PATCH'])
def sy_update(request):
    # first get the 'id' from the JSON data
    id = request.data['id']
    try:
        selected_sy = SystemModel.objects.get(id=id)
    except SystemModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Response to the PATCH request and update the database
    if request.method == 'PATCH':
        serializer = SystemSerializer(selected_sy, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Remove/Delete
@api_view(['DELETE'])
def sy_remove(request):
    # first get the 'id' from the URL data
    id = request.GET.get('id')
    try:
        selected_sy = SystemModel.objects.get(id=id)
    except SystemModel.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    related_sf = SystemFunction.objects.filter(sf_parent=id)
    if related_sf.exists():
        return Response(status=status.HTTP_404_NOT_FOUND)
    # delete the request item in the database
    if request.method == 'DELETE':
        selected_sy.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

# ISSUE LOGS
###############################################################
class il_list_response(ListAPIView):
    # Use the customized response data type to work with Ant Design Pro
    def list(self, request):
        queryset = IssueLog.objects.all()

        response = {
            'data': []
        }

        il_index_filter = self.request.query_params.get('il_index', None)
        if il_index_filter is not None:
            queryset = queryset.filter(il_index=il_index_filter)

        serializer = IssueLogSerializer(queryset, many=True)
        response['data'] = serializer.data
        #response['total'] = len(serializer.data)

        return Response(response)

class il_list(il_list_response):
    serializer_class = IssueLogSerializer
    queryset = IssueLog.objects.all()

class il_post(generics.CreateAPIView):
    queryset = IssueLog.objects.all()
    serializer_class = IssueLogSerializer

# Update Item
#class cs_update(generics.UpdateAPIView):
#    queryset = CareSetting.objects.all()
#   serializer_class = CareSettingSerializer
@api_view(['PATCH'])
def il_update(request):
    # first get the 'id' from the JSON data
    id = request.data['id']
    try:
        selected_il = IssueLog.objects.get(id=id)
    except IssueLog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Response to the PATCH request and update the database
    if request.method == 'PATCH':
        serializer = IssueLogSerializer(selected_il, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Item
# class cs_remove(generics.RetrieveDestroyAPIView):

#     queryset = CareSetting.objects.all()
#     serializer_class = CareSettingSerializer
@api_view(['DELETE'])
def il_remove(request):
    # first get the 'id' from the URL data
    id = request.GET.get('id')
    try:
        selected_il = IssueLog.objects.get(id=id)
    except IssueLog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # delete the request item in the database
    if request.method == 'DELETE':
        selected_il.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# CARE SETTINGS
###############################################################
# List view
# @api_view(['GET'])
# def cs_list(request):
#     filter_cs_index = request.GET['cs_index']
#     filter_cs_name = request.GET['cs_name']
#     filter_cs_desc = request.GET['cs_desc']

#     try:

#     serializer = CareSettingSerializer(queryset, many=True)

# class cs_list_response(generics.ListAPIView):
#     def list(self, request):
#         queryset = CareSetting.objects.all()
#         response ={
#             'data': []
#         }

#         serializer = CareSettingSerializer(queryset, many=True)

#         response['data'] = serializer.data
#         return Response(response)

class cs_list_response(ListAPIView):
    # Use the customized response data type to work with Ant Design Pro
    def list(self, request):
        queryset = CareSetting.objects.all()

        response = {
            'data': []
        }

        # cs_name_filter is provided, but the frontend dose not use it
        # TODO
        cs_name_filter = self.request.query_params.get('cs_name', None)
        if cs_name_filter is not None:
            queryset = queryset.filter(cs_name=cs_name_filter)

        serializer = CareSettingSerializer(queryset, many=True)
        response['data'] = serializer.data
        #response['total'] = len(serializer.data)

        return Response(response)

class cs_list(cs_list_response):
    serializer_class = CareSettingSerializer
    queryset = CareSetting.objects.all()

# Detail view
# class caresettings_detail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = CareSetting.objects.all()
#     serializer_class = CareSettingSerializer

# Create New Item
# Use Django Rest Framework's Generic View
class cs_post(generics.CreateAPIView):
    queryset = CareSetting.objects.all()
    serializer_class = CareSettingSerializer

# Update Item
#class cs_update(generics.UpdateAPIView):
 #    queryset = CareSetting.objects.all()
  #   serializer_class = CareSettingSerializer
@api_view(['PATCH'])
def cs_update(request):
    # first get the 'id' from the JSON data
    id = request.data['id']
    try:
        selected_cs = CareSetting.objects.get(id=id)
    except CareSetting.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # Response to the PATCH request and update the database
    if request.method == 'PATCH':
        serializer = CareSettingSerializer(selected_cs, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Item
# class cs_remove(generics.RetrieveDestroyAPIView):

#     queryset = CareSetting.objects.all()
#     serializer_class = CareSettingSerializer
@api_view(['DELETE'])
def cs_remove(request):
    # first get the 'id' from the URL data
    id = request.GET.get('id')
    try:
        selected_cs = CareSetting.objects.get(id=id)
    except CareSetting.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    # delete the request item in the database
    if request.method == 'DELETE':
        selected_cs.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @csrf_exempt
# class cs_remove(viewsets.ModelViewSet):
#     queryset = CareSetting.objects.all()
#     serializer_class = CareSettingSerializer

#     @action(methods=['delete'], detail=False)
#     def bulk_delete(self, request,  *args, **kwargs):
#         delete_id = request.query_params.get('deleteid', None)
#         if not delete_id:
#             return Response(status=status.HTTP_404_NOT_FOUND)
#         for i in delete_id.split(','):
#             get_object_or_404(CareSetting, pk=int(i)).delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
