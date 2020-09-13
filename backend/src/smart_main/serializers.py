from rest_framework import serializers
from smart_main.models import CareSetting, IssueLog, SystemModel, SystemFunction, HazardType, HazardInstance, ProcessSystem, ProcessNode, ProcessEdge, ProcessNode_SystemFunction, ProcessNode_HazardInstance, RiskMatrix, Report, NodeGroup, Cause, Effect, CauseControl, EffectControl
import json


# CAUSE
class CauseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cause
        fields = [
            'id',
            'ca_name',
            'ca_desc',
            'ca_hi',
        ]

# EFFECT
class EffectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Effect
        fields = [
            'id',
            'ef_name',
            'ef_desc',
            'ef_hi',
        ]

# CAUSE CONTROL
class CauseControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = CauseControl
        fields = [
            'id',
            'caco_name',
            'caco_desc',
            'caco_state',
            'caco_type',
            'caco_ca',
        ]

# EFFECT CONTROL
class EffectControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = EffectControl
        fields = [
            'id',
            'efco_name',
            'efco_desc',
            'efco_state',
            'efco_type',
            'efco_ef',
        ]

# NODE GROUP
class NodeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = NodeGroup
        fields = [
            'id',
            'label',
            'x',
            'y',
            'ng_ps',
        ]

# REPORT SERIALIZER
class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = [
            'id',
            're_name',
            're_desc',
            're_crm',
            're_ss',
            're_qa',
            're_cm',
        ]


# RISK MATRIX SERIALIZER
class RiskMatrixSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskMatrix
        fields = [
            'id',
            'value',
            'user',
        ]


# PROCESS NODE / HAZARD INSTANCE SERIALIZER
class ProcessNode_HazardInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessNode_HazardInstance
        fields = [
            'id',
            'pn',
            'hi',
        ]

# PROCESS NODE / SYSTEM FUNCTION SERIALIZER
class ProcessNode_SystemFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessNode_SystemFunction
        fields = [
            'id',
            'pn',
            'sf',
        ]

# PROCESS EDGE SERIALIZER
#####################################################
class ProcessEdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessEdge
        fields = [
            'id',
            'label',
            'source',
            'target',
            'pe_ps',
            'pe_desc',

        ]

# PROCESS NODE SERIALIZER
#####################################################
class ProcessNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessNode
        fields = [
            'id',
            'label',
            'x',
            'y',
            'color',
            'size',
            'shape',

            'pn_desc',
            'pn_cs',
            'pn_ps',

            'parent',
        ]

# PROCESS SYSTEM SERIALIZER
#####################################################
class ProcessSystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessSystem
        fields = [
            'pk',
            'ps_name',
            'ps_desc',
        ]

# HAZARD TYPE SERIALIZER
#####################################################
class HazardTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HazardType
        fields = [
            'pk',
            'ht_name',
            'ht_desc',
        ]

# HAZARD INSTANCE SERIALIZER
#####################################################
class HazardInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HazardInstance
        fields = [
            'pk',
            'hi_name',
            'hi_desc',
            'hi_inse',
            'hi_inli',
            'hi_rese',
            'hi_reli',
            'hi_inrr',
            'hi_rerr',
            'hi_clju',
            'hi_parent',
            'hi_ps',
            'hi_sf',
        ]

# SYSTEM FUNCTION SERIALIZER
#####################################################
class SystemFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemFunction
        fields = [
            'pk',
            'sf_name',
            'sf_desc',
            'sf_parent'
        ]

# SYSTEM SERIALIZER
#####################################################
class SystemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemModel
        fields = [
            'pk',
            'sy_name',
            'sy_desc'
        ]

# ISSUE LOG SERIALIZER
#####################################################
class IssueLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueLog
        fields = [
            'pk',
            'il_name',
            'il_desc'
        ]

# CARE SETTING SERIALIZER
#####################################################
class CareSettingSerializer(serializers.ModelSerializer):
    # Convert to JSON
    # and validate
    class Meta:
        model = CareSetting
        fields = [
            'pk',
            'cs_name',
            'cs_desc'
        ]
